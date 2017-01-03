var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "http://www.theschooloflife.com/shop/all/";
const toUSD = 1.22;

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('li.item.last').each(function(index) {
        var itemName = $(this).find('h2.product-name > a').text().trim();
        var itemPriceRaw = $(this).find('span.price').text().trim();
        var itemPriceInPounds = parseFloat(itemPriceRaw.substring(1, itemPriceRaw.length));
        var itemPrice = "$" + (itemPriceInPounds * toUSD).toFixed(2).toString();
        var itemImage = $(this).find('a.product-image > img').attr('src');
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
    .then(append('schooloflife-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
