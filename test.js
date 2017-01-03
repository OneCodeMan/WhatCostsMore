var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

const url = "http://www.cardkingdom.com/mtg/alpha?filter%5Bipp%5D=20&filter%5Bsort%5D=price_desc";

var data = [];

request(url, function(error, response, body) {
    if (error) {
        console.log("error: " + error);
    }

    var $ = cheerio.load(body);

    $('div.productItemWrapper').each(function(index) {
        var itemImage = $(this).find('a.cardLink > img').prop('data-src');
        console.log(itemImage);
    });

});
