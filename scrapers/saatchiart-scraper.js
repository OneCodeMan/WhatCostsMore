var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "https://www.saatchiart.com/new-media/abstract/abstract/acrylic?price=1000-2000";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('li.art-item').each(function(index) {
        var itemName = $(this).find('h4.list-art-title > a').text().trim();
        var itemPrices = $(this).find('div.list-art-price > div > div').text().trim();
        var itemPrice = itemPrices.substr(0, 7);
        var itemImage = "http:" + $(this).find('img').attr('src');
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
    .then(append('saatchiart-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
