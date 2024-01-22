import svelteWrapper from "JsComponents/svelte-wrapper"; 
import SampleSvelte from  "SvelteComponents/sample.svelte"

export default () => {
    svelteWrapper(SampleSvelte, 'sample-svelte' , '#svelte-data');  
    //sampleSvelte is a svelte component
    //sample-svelte is a custom element where you want to render , simply create a snippet or section and define 
    // <sample-svelte> </sample-svelte>
    //if you want to pass props or shopify data simply add the script with the id  #svelte-data 
    // <sample-svelte>
    //   <script id="#svelte-data">
    //     {
    //         "data": {}  //shopify json here
    //     }
    //   </script>
    //</sample-svelte>
    //on sample-svelte.js , you can access the shopify data in variable shopifyData 
    //check svelte-wrapper.js for more info

}  