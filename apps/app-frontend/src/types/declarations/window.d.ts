import { NextWebVitalsMetric } from 'next/app';

declare global {
  interface Window {
    _webmetric: NextWebVitalsMetric[];
  }
}
