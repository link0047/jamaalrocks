import parser from 'ua-parser-js';
import _data from './products.json';

export function load(data) {
  const ua = parser(data.locals.ua);
  return {
    params: data.params,
    products: _data,
    isMobile: ua.device.type === 'mobile' || ua.device.type === 'tablet'
  };
}