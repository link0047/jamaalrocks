import { writable } from 'svelte/store';

export let dataStore = writable({
  open: false,
  panel: {
    name: '',
    image: '',
    size: [],
    color: [],
    price: { base: null, sale: null }
  }
});