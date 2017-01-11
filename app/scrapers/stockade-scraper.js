var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "http://www.stockade.ca/Craft-Supplies_c_7.html";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('div.productBlockContainer').each(function(index) {
        $('div.product-container').each(function(idx) {
            var itemName = $(this).find('div.name > a').text().trim();
            var itemPriceRaw = $(this).find('div.price').text().trim();
            var itemPrice = itemPriceRaw.substring(itemPriceRaw.indexOf("$")+1, itemPriceRaw.length);
            var itemImage = "http://stockade.ca/" + $(this).find('div.img > a > img').attr('src');
            if (itemPrice) {
                data.push({ name: itemName, price: itemPrice, src: itemImage });
            }
        });
    });

    var dataAsJSON = JSON.stringify(data);
    return dataAsJSON;
}

var append = file => content => fsp.appendFile(file, content);

rp(url)
    .then(parse)
    .then(append('stockade-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
