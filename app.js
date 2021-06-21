const csv = require('csv-parser');
const fs = require('fs');
var resultsFromCsv = [];
var itemFromShopify = [];


function updateInventoryFromLivingsport (){
fs.createReadStream('InventoryList.csv')
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
  });
}
updateInventoryFromLivingsport();