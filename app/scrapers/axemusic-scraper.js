var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

var highestPgNumber = 4;
const url = 'https://www.axemusic.com/guitars.html?limit=30&p=';

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('li.item').each(function(index) {
        var itemName = $(this).find('h2.product-name > a').text().trim();
        var itemPrice = $(this).find('span.price').text().trim();
        var itemImage = $(this).find('a.product-image > img').attr('src');
        if (itemPrice) {
            data.push({ name: itemName, price: itemPrice, src: itemImage });
        }
    });

    var dataAsJSON = JSON.stringify(data);
    return dataAsJSON;
}

var append = file => content => fsp.appendFile(file, content);

for(var i = 1; i < highestPgNumber; i++) {

    rp(url + i)
        .then(parse)
        .then(append('axemusic-items.json'))
        .then(() => console.log('success from loop ' + i + ', ' + scriptName))
        .catch(err => console.log('Error: ', err));

}
