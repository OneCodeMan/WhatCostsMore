var fs = require('fs');
var datasets = ['axemusic-items.json'];

for(var i = 0; i < datasets.length; i++) {

    var currentDataset = datasets[i];

    fs.readFile(currentDataset, 'utf-8',  function(err, data) {
        var dirtyJSON = data;
        var cleanJSONRaw = dirtyJSON.split('][').join(',');
        var cleanJSON = JSON.stringify(cleanJSONRaw);

        writeToFile(cleanJSONRaw, currentDataset);
    });
}

function writeToFile(data, fileName) {

    fs.writeFile(fileName, data, function(error) {
        if (error) return error;
        console.log('writing file success');
    });

}


// scrape everything
// cleanjson.JS
//
