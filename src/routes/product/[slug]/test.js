import _data from './products.json';
import parser from 'ua-parser-js';

export async function load({ params }) {
  // separate products.json into multiple files
  return {
    params,
    products: _data,
  }
}