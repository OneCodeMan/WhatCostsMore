var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');

const url = "http://www.bestbuy.ca/Search/SearchResults.aspx?type=product&filter=category%3AComputers+%26+Tablets%3Bcurrentoffers0enrchstring%3AOn+Sale&icmp=VIPSep1_Sub_LuggageMP_QL_SetsOnSale_1&page=1&pageSize=96";

var data = [];

function parse(html) {
    var $ = cheerio.load(html);

    $('li.listing-item').each(function(index) {
        var itemName = $(this).find('h4.prod-title > a').text().trim();
        var itemPrice = $(this).find('span.amount').text().trim();
        var itemImage = $(this).find('div.prod-image > a > img').attr('src');
        data.push({ name: itemName, price: itemPrice, src: itemImage });
    });

    var dataAsJSON = JSON.stringify(data);
    return dataAsJSON;
}

var append = file => content => fsp.appendFile(file, content);

rp(url)
    .then(parse)
    .then(append('bestbuy-items.json'))
    .then(() => console.log("success"))
    .catch(err => console.log(err));
