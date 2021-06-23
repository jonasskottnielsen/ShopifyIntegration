const csv = require('csv-parser');
const fs = require('fs');
var request = require('request');

var resultsFromCsv = [];
var itemFromShopify = [];
const location_id = '6884556842';
// shopify
function updateInventoryFromLivingsport (){
var options = {
  'method': 'GET',
  'url': 'https://5d7873324b99aa9feeca55e01e8c02d9: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@barecykling.myshopify.com/admin/api/2021-04/products/6774582771885.json',
  //'url': 'https://5d7873324b99aa9feeca55e01e8c02d9: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@barecykling.myshopify.com/admin/api/2021-04/products.json',
  'headers': {
  }
};
// parse tager json-string -> js-obj
request(options, function (error, response) {
  if (error) throw new Error(error);
  var products = JSON.parse(response.body);// obj
  console.log(products.product.variants);
  console.log(products);
  //console.dir(JSON.parse(response.body).products[3]) //tager sku-nr  
  /*for(i=0; i < 50; i++){
    console.log(JSON.parse(response.body).products[i].variants[0].sku) //tager sku-nr
    console.log(JSON.parse(response.body).products[i].title)
    console.log('----------------')
  }*/
});
//excel
/*fs.createReadStream('InventoryList.csv')
  .pipe(csv())
  .on('data', (row) => {
    const item = {
        sku: `${row["LivingSport SKU no."]}`,
        Quantity: `${row["Quantity"]}`,
        Arrival: `${row["Next Arrival"]}`,
        brand: `${row["Brand"]}`
    };
    resultsFromCsv.push(item);
  })
  .on('end', () => {
    //console.log(resultsFromCsv)
    resultsFromCsv.forEach(element => {
      console.log(element);
      console.log('--------------')
    });
  });*/
}
updateInventoryFromLivingsport();


/* de id'er der skal bruges til at updatere en produkt variant.
{
  "location_id": 6884556842,
  "inventory_item_id": 12250274365496,
  "available": 11
}
*/