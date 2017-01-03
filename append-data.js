var fs = require('fs');
var datasets = ['arrohome-items.json', 'bestbuy-items.json', 'cardkingdom-items.json',
                'dollhouse-items.json', 'oopc-items.json', 'ottycb-items.json',
                'saatchiart-items.json'];

var allData = [];


for(var i = 0; i < datasets.length; i++) {
    fs.readFile(datasets[i], 'utf8', onFileRead);
}


function onFileRead(err, data) {
    if (err) throw err;
    var currentPackage = JSON.parse(data); // parsed into js array
}
