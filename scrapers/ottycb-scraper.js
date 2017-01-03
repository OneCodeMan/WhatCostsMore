var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "http://ohthethingsyoucanbuy.com/";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('div.box-container').each(function(index) {
        var itemName = $(this).find('h2').text().trim();
        var itemPrice = $(this).find('span.price').text().trim();
        var itemImage = $(this).find('img').prop('src');
        if (itemPrice) {
            data.push({ name: itemName, price: itemPrice, src: itemImage });
        }
    });

    var dataAsJSON = JSON.stringify(data);
    return dataAsJSON;
}

var append = file => content => fsp.appendFile(file, content);

rp(url)
    .then(parse)
    .then(append('ottycb-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
