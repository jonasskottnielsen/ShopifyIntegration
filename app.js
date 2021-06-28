const csv = require('csv-parser');
const fs = require('fs');
var request = require('request');

var resultsFromCsv = [];
var itemFromShopify = [];
const itemsToUpdate = [];
const location_id = '6884556842'; // baresundhed
var counter = 1;

// shopify
function getProductsFromShopify (){
var options = {
  'method': 'GET',
  //'url': 'https://5d7873324b99aa9feeca55e01e8c02d9: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@barecykling.myshopify.com/admin/api/2021-04/products/6774582771885.json',
  'url': 'https://5d7873324b99aa9feeca55e01e8c02d9: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@barecykling.myshopify.com/admin/api/2021-04/products.json',
  'headers': {
  }
};
// parse tager json-string -> js-obj
request(options, function (error, response) {
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
});
}
  //excel
/*fs.createReadStream('InventoryList.csv')
.pipe(csv({ separator: ',' }))
.on('data', (row) => {
  const item = {
      Product: `${row["Decription"]}`,
      //Price: `${row["PRICE"]}`,
      Quantity: `${row["Quantity"]}`,
      sku : `${row['LivingSport SKU no.']}`
  };
  resultsFromCsv.push(item);
})
.on('end', () => {
  console.log(resultsFromCsv)
});*/
  //excel 
function getInventoryFromExcel() {
  fs.createReadStream('Inventory_list_LivingSport.csv')
  .pipe(csv({headers: false}))
  .on('data', (data) => resultsFromCsv.push(data))
  .on('end', () => {
    console.log(resultsFromCsv);
    /* [
      '0': '885652014373', //EAN
      '1': '415', // lagerantal
      '2': '400-110150', // sku
      '3': 'Reebok Step Mini',
      '4': '0',
      '5': 'REEBOK', // brand
      '6': '02-08-2021', // next arrival
      '7': ''
     ]*/
  }); 
}

function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

function compare(){
for(i=0; i<itemFromShopify.length; i++){

  for(j=0; j<resultsFromCsv.length; j++){
    if (typeof itemFromShopify[i].sku==='undefined'){
      console.log('sku is undefined');
    } else {
      if (itemFromShopify[i].sku === resultsFromCsv[j]['2']){
        itemsToUpdate.push({
          sku: itemFromShopify[i].sku, 
          available: resultsFromCsv[j]['1'],
          inventory_item_id : itemFromShopify[i].inventory_item_id
        });
        console.log('-------------------')
        console.log('added entry to array')
        console.log('-------------------')
        break;
      }
    }
  }
}
console.log(itemsToUpdate)
}
var testData = [
  {inventory_item_id: 41450215932077, location_id: 37189550162, available: 11},
  {inventory_item_id: 39861769011373, location_id: 37189582930, available: 273}
];

function updateInventory(){
testData.forEach(element => {
  var options = {
    'method': 'POST',
    'url': 'https://5d7873324b99aa9feeca55e01e8c02d9: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@barecykling.myshopify.com/admin/api/2021-04/inventory_levels/set.json',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "location_id": 37189550162,
      "inventory_item_id": element.inventory_item_id,
      "available": element.available
    })
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  }); 
});
 
}

//setTimeout(getProductsFromShopify, 0);
//setTimeout(getInventoryFromExcel, 1000);
//setTimeout(compare, 3000);
setTimeout(updateInventory);

//https://5d7873324b99aa9feeca55e01e8c02d9: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@barecykling.myshopify.com/admin/api/2021-04/inventory_levels/set.json

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