import _data from './products.json';
export function load({ params }) {
  return {
    params,
    products: _data
  };
}