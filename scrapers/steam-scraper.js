var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "http://store.steampowered.com/search/?filter=topsellers";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('a.search_result_row').each(function(index) {
        var itemName = $(this).find('span.title').text().trim();
        var itemPrices = $(this).find('div.col.search_price').text().trim();
        var itemPrice = itemPrices.substring(3, itemPrices.length).replace(' ', '');
        var itemImage = $(this).find('div.col.search_capsule > img').attr('src');
        data.push({ name: itemName, price: itemPrice, src: itemImage });

    });

    var dataAsJSON = JSON.stringify(data);
    return dataAsJSON;
}

var append = file => content => fsp.appendFile(file, content);

rp(url)
    .then(parse)
    .then(append('steam-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
