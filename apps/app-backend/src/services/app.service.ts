import { Injectable } from '@nestjs/common';

import { OverpassService } from './overpass/overpass.service';

@Injectable()
export class AppService {
  private overpassService: OverpassService;
  constructor() {
    this.overpassService = new OverpassService();
  }

  async getData() {
    return this.overpassService.getDataByAmenityAndBbox(
      'drinking_water',
      '41.72491723955834,12.300760746002197,41.73228367493647,12.310470342636108'
    );
  }
}
