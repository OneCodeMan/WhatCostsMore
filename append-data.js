var fs = require('fs');
var datasets = ['arrohome-items.json', 'bestbuy-items.json', 'cardkingdom-items.json',
                'dollhouse-items.json', 'oopc-items.json', 'ottycb-items.json',
                'saatchiart-items.json'];

var allData = [];

for(var i = 0; i < datasets.length; i++) {
    var currentPackage = require('./' + datasets[i]);
    allData = allData.concat(currentPackage);
}

//console.log(allData.length);

var allDataJSON = JSON.stringify(allData);

fs.writeFile('items.json', allDataJSON, function(error) {
    if (error) return error;
    console.log("Writing file success");
});
