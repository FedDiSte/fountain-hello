import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import osmtogeojson from 'osmtogeojson';
import { HttpUtils } from '@fountain-hello/utils';
import xmldom from 'xmldom';

@Injectable()
export class OverpassService {
  private configService: ConfigService;
  private OVERPASS_BASE_URL: string;

  constructor() {
    this.configService = new ConfigService();
    this.OVERPASS_BASE_URL = this.configService.get('OVERPASS_PUBLIC_URL');
  }

  async getDataByAmenityAndBbox(amenity: string, bbox: string) {
    const query = { data: `node[amenity=${amenity}](${bbox});out;` };
    const url = HttpUtils.generateUrlWithQueryParams(this.OVERPASS_BASE_URL, query);

    try {
      const response = await HttpUtils.customFetch<string>(url);
      return this.handleXml(response);
    } catch (error) {
      console.error(`[ERROR]: Could not get overpass data, amenity: ${amenity}, bbox: ${bbox}`);
      throw error;
    }
  }

  private handleXml = (data: string) => {
    const parser = new xmldom.DOMParser();
    const doc = parser.parseFromString(data);
    return this.toGeoJson(doc);
  };

  private toGeoJson = (data) => {
    return osmtogeojson(data, { flatProperties: true });
  };
}
