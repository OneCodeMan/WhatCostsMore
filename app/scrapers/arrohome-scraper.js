var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "https://www.arrohome.com/us/furniture";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('div.large-3.medium-3.small-6').each(function(index) {
        var itemName = $(this).find('h2.product-name > a').text().trim();
        var itemPrices = $(this).find('p.product-price > span').text().trim();
        var itemPrice = itemPrices.substr(2, itemPrices.length);
        var itemImage = $(this).find('img.lazy').attr('src');
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
    .then(append('arrohome-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
