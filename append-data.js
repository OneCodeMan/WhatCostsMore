var datasets = ['arrohome-items.json', 'bestbuy-items.json', 'cardkingdom-items.json',
                'dollhouse-items.json', 'oopc-items.json', 'ottycb-items.json',
                'saatchiart-items.json'];

for(var i = 0; i < datasets.length; i++) {
    var currentPackage = require('./' + datasets[i]);
    console.log(currentPackage);
}
