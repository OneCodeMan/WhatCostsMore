var fs = require('fs');
var datasets = ['arrohome-items.json', 'axemusic-items.json', 'bestbuy-items.json', 'cardkingdom-items.json',
                'dollhouse-items.json', 'oopc-items.json', 'ottycb-items.json',
                'saatchiart-items.json', 'steam-items.json', 'grs-items.json',
                'schooloflife-items.json', 'syndromestore-items.json'];

var allDataRaw = [];

// get the data
for(var i = 0; i < datasets.length; i++) {
    var currentPackage = require('./' + datasets[i]);
    allDataRaw = allDataRaw.concat(currentPackage);
}

// manipulate the data
for(var j = 0; j < allDataRaw.length; j++) {
    var currentData = allDataRaw[j];

    if (currentData.price == '$NaN') {
        allDataRaw.splice(j, 1);
    } else {
        var priceString = currentData.price.substring(1, currentData.price.length);
        var priceFloatRaw = priceString.replace(',', '');
        var priceFloat = parseFloat(priceFloatRaw).toFixed(2);
        allDataRaw[j].price = priceFloat;
    }
}

//console.log(allData.length);

// extract the data
var allDataJSON = JSON.stringify(allDataRaw);

fs.writeFile('items.json', allDataJSON, function(error) {
    if (error) return error;
    console.log('Writing file success');
});
