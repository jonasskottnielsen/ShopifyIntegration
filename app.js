const csv = require('csv-parser');
const fs = require('fs');
var request = require('request');

var resultsFromCsv = [];
var itemFromShopify = [];
const location_id = '6884556842';
var counter = 1;
// shopify
function updateInventoryFromLivingsport (){
var options = {
  'method': 'GET',
  //'url': 'https://5d7873324b99aa9feeca55e01e8c02d9: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@barecykling.myshopify.com/admin/api/2021-04/products/6774582771885.json',
  'url': 'https://5d7873324b99aa9feeca55e01e8c02d9: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@barecykling.myshopify.com/admin/api/2021-04/products.json',
  'headers': {
  }
};
// parse tager json-string -> js-obj
/*request(options, function (error, response) {
  if (error) throw new Error(error);
  var data = JSON.parse(response.body);

  for(i=0; i < data.products.length; i++){
    
    for(j=0; j < data.products[i].variants.length; j++){
        itemFromShopify.push({
              nr : counter,
              sku : JSON.parse(response.body).products[i].variants[j].sku, 
              inventory_item_id : JSON.parse(response.body).products[i].variants[j].inventory_item_id});
        counter += 1;
    }
  }
  console.log(itemFromShopify) 
});*/
  //excel
fs.createReadStream('RLVNTPriceStocki.csv')
.pipe(csv({ separator: ';' }))
.on('data', (row) => {
  const item = {
      Product: `${row["PRODUCT"]}`,
      Price: `${row["PRICE"]}`,
      Quantity: `${row["INVENTORY"]}`,
      sku : `${row['YOUR.SKU']}`
  };
  resultsFromCsv.push(item);
})
.on('end', () => {
  console.log(resultsFromCsv)
});
}

updateInventoryFromLivingsport();

/* 
Først kald shopify og få alle id'er
sku'er + variants.inventory_item_id
*/

/* de id'er der skal bruges til at updatere en produkt variant.
{
  "location_id": 6884556842,
  "inventory_item_id": 12250274365496,
  "available": 11
}
*/