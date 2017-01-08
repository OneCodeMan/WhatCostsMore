var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "https://syndromestore.com/collections/new?page=2";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('div.product').each(function(index) {
        var itemName = $(this).find('h2.title').text().trim();
        var itemPrice = $(this).find('span.money').text().trim();
        var itemImage = "http:" + $(this).find('div.image > a > img').attr('src');
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
    .then(append('syndromestore-items.json'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
