var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "http://www.giantrobot.com/";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('div.grid-product__wrapper').each(function(index) {
        var itemName = $(this).find('span.grid-product__title').text().trim();
        var itemPriceRaw = $(this).find('span.grid-product__price').text().trim();
        var itemPriceToFloat = parseFloat(itemPriceRaw.substring(2)).toFixed(2);
        var itemPrice = "$" + itemPriceToFloat.toString();
        var itemImage = "http:" + $(this).find('img.grid-product__image').attr('src');
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
    .then(append('grs-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
