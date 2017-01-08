var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "http://www.cardkingdom.com/mtg/alpha?filter%5Bipp%5D=20&filter%5Bsort%5D=price_desc";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('div.productItemWrapper').each(function(index) {
        var itemName = $(this).find('span.productDetailTitle > a').text().trim();
        var itemPrices = $(this).find('span.stylePrice').text().trim();
        var itemPrice = itemPrices.substr(0, itemPrices.indexOf(' '));
        var itemImage = $(this).find('a.cardLink > img.cardSrc').attr('data-src');
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
    .then(append('cardkingdom-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
