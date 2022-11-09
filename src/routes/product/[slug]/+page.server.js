import parser from 'ua-parser-js';
import _data from './products.json';
import { TMDB_API_KEY } from '$env/static/private';

console.log(TMDB_API_KEY);

export function load(data) {
  const ua = parser(data.locals.ua);
  return {
    params: data.params,
    products: _data,
    isMobile: ua.device.type === 'mobile' || ua.device.type === 'tablet'
  };
}