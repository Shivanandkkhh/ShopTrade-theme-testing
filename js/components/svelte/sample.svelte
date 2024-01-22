<script>
import { onMount } from "svelte";

 export let shopifyData;
 onMount(() => {
  console.log(shopifyData , "Data from shopify");
 })
</script>

<h1>Hello Svelte!!</h1>