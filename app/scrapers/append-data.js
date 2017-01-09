/*
TODO: Just loop through directory for files that end with ".json"
*/

var fs = require('fs');
var datasets = ['arrohome-items.json', 'bestbuy-items.json', 'cardkingdom-items.json',
                'dollhouse-items.json', 'oopc-items.json', 'ottycb-items.json',
                'saatchiart-items.json', 'steam-items.json', 'grs-items.json',
                'schooloflife-items.json', 'syndromestore-items.json'];

var allDataRaw = [];

for(var i = 0; i < datasets.length; i++) {
    var currentPackage = require('./' + datasets[i]);
    allDataRaw = allDataRaw.concat(currentPackage);
}

for(var j = 0; j < allDataRaw.length; j++) {
    var currentData = allDataRaw[j];

    if (currentData.price == "$NaN") {
        allDataRaw.splice(j, 1);
    } else {
        var priceString = currentData.price.substring(1, currentData.price.length);
        var priceFloat = parseFloat(priceString).toFixed(2);

        allDataRaw[j].price = priceFloat;
    }
}

//console.log(allData.length);

var allDataJSON = JSON.stringify(allDataRaw);

fs.writeFile('items.json', allDataJSON, function(error) {
    if (error) return error;
    console.log("Writing file success");
});
