var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "https://www.outofprintclothing.com/collections/mens-tees";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('div.product-index').each(function(index) {
        var itemName = $(this).find('h3').text().trim();
        var itemPriceRaw = $(this).find('div.prod-price').text().trim();
        var itemPrice = itemPriceRaw.replace(' ', '');
        var itemImage = "http:" + $(this).find('a.initial-image > img').attr('src');
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
    .then(append('oopc-items.json'))
    .then(() => console.log("success from " + scriptName))
    .catch(err => console.log(err));
