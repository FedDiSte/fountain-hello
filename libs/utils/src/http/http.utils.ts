import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export async function customFetch<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios(url, options);
    return response.data;
  } catch (error) {
    console.error(`[ERROR]: Error during ${url} fetch: ${(error as AxiosError).message}`);
    throw error;
  }
}

export const generateUrlWithQueryParams = (url: string, params: { [x: string]: unknown }): string => {
  const cleanParams = getCleanPramas(params);
  const searchParams = new URLSearchParams(cleanParams);
  return `${url}?${searchParams}`;
};

const isNotDefined = (value: unknown): value is null | undefined => value === null || value === undefined;

const getCleanPramas = (obj: { [key in string]: unknown }): {
  [key in string]: string;
} =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    const entry = isNotDefined(value) ? {} : { [key]: value?.toString() };
    return {
      ...acc,
      ...entry,
    };
  }, {});
