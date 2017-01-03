var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');

const url = "https://www.etsy.com/shop/mousemarket?source=aw&awc=6939_1483398873_e45ef69a2ff68800fc9a7edb3774ce04&utm_source=affiliate_window&utm_medium=affiliate&utm_campaign=ca_location_buyer&utm_content=78888";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('div.block-grid-item').each(function(index) {
        var itemNameRaw = $(this).find('div.card-meta-row-item').text().trim();
        var itemName = itemNameRaw.substring(0, itemNameRaw.indexOf('\n'));
        var itemPrice = $(this).find('span.currency.text-smaller').text().trim();
        var itemImage = $(this).find('img').prop('src');
        data.push({ name: itemName, price: itemPrice, src: itemImage });
    });

    var dataAsJSON = JSON.stringify(data);
    return dataAsJSON;
}

var append = file => content => fsp.appendFile(file, content);

rp(url)
    .then(parse)
    .then(append('dollhouse-items.json'))
    .then(() => console.log("success"))
    .catch(err => console.log(err));
