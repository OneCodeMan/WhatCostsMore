/*
TODO: Make proper AJAX call to JSON data
TODO: Display: random item pic, item name, item price, on both sides
TODO: Display buttons (higher, lower, same)
TODO: Make those buttons work
*/
var $leftcol = $("#left-col");
var $rightcol = $("#right-col");
var jsonUrl = "https://api.myjson.com/bins/1df8v3";

function generateRandomNumber(length) {
    var index = Math.floor(Math.random() * (length - 1));
    return index;
}

var gradientIndex = generateRandomNumber(gradients.length);

$leftcol.css({"background-color" : gradients[gradientIndex][0]});
$rightcol.css({"background-color" : gradients[gradientIndex][1]});
