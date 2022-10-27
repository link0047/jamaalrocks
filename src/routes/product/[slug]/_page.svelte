<script>
  import { onMount, afterUpdate } from 'svelte';
  import { Breadcrumb, Crumb } from '../../../lib/breadcrumbs';
  import { Select, SelectOption } from '../../../lib/select';
  import { Chips, Chip } from '../../../lib/chips';
  import { Collapsible } from '../../../lib/collapsible';
  import { List, ListItem } from '../../../lib/list';
  import { Button, Fab } from '../../../lib/button';
  import Checkbox from '../../../lib/checkbox';
  import Slider from '../../../lib/slider';
  import { Radio } from '../../../lib/radio';
  import { Pagination } from '../../../lib/pagination';
  import { Action } from '../../../lib/card';
  import { ProductCard } from '../../../lib/productcard';
  import Drawer from '../../../lib/drawer';
  import GlobalHeader from '../../../lib/globalheader';
  export let data;

  console.log(data.params.slug)
</script>
<GlobalHeader></GlobalHeader>
<h1>Hello</h1>