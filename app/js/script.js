/*
TODO: Display buttons (higher, lower, same)
TODO: Make those buttons work
*/
var $priceText = $(".price-text");
var $leftCol = $("#left-col");
var $rightCol = $("#right-col");
var $leftPic = $("#left-pic");
var $leftItemName = $("#left-item-name");
var $leftItemPrice = $("#left-item-price");
var $rightPic = $("#right-pic");
var $rightItemName = $("#right-item-name");
var $rightItemPrice = $("#right-item-price");
var jsonUrl = "https://api.myjson.com/bins/1df8v3";

function generateRandomNumber(length) {
    var firstRandNum = Math.floor(Math.random() * (length - 1));
    var secondRandNum = Math.floor(Math.random() * (length - 1));

    while (firstRandNum === secondRandNum) {
        secondRandNum = Math.floor(Math.random() * (length - 1));
    }

    return [firstRandNum, secondRandNum];
}

var gradientIndex = generateRandomNumber(gradients.length)[0];

$leftCol.css({"background-color" : gradients[gradientIndex][0]});
$rightCol.css({"background-color" : gradients[gradientIndex][1]});

$.ajax({
    url: jsonUrl,
    type: 'GET',
    success: function(data) {
        jsonData = data;
        update(null);

        // logic

    },
    error: function(jqXHR, error) {
        console.log("ERROR OCCURED: ", error);
    },
});

var update = function(input) {
    if (input != null) {
        // game
    } else {
        // initialization
        var index = generateRandomNumber(jsonData.length);
        var [indexOne, indexTwo] = index;
        var [productOne, productTwo] = [jsonData[indexOne], jsonData[indexTwo]];

        console.log(productOne.src, productOne.name, productOne.price);


        $leftPic.attr("src", productOne.src);
        $leftItemName.text(productOne.name);
        $leftItemPrice.text(productOne.price);

        $rightPic.attr("src", productTwo.src);
        $rightItemName.text(productTwo.name);
        $rightItemPrice.text(productTwo.price);


    }

}
