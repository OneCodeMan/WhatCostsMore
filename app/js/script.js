/*
TODO: Display: random item pic, item name, item price, on both sides
TODO: Display buttons (higher, lower, same)
TODO: Make those buttons work
*/
var $leftCol = $("#left-col");
var $rightCol = $("#right-col");
var $picDiv = $(".pic-div");
var jsonUrl = "https://api.myjson.com/bins/1df8v3";

function generateRandomNumber(length) {
    var index = Math.floor(Math.random() * (length - 1));
    return index;
}

var gradientIndex = generateRandomNumber(gradients.length);

$leftCol.css({"background-color" : gradients[gradientIndex][0]});
$rightCol.css({"background-color" : gradients[gradientIndex][1]});

$.ajax({
    url: jsonUrl,
    type: 'GET',
    success: function(data) {
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
        // you have so much to learn about jQuery...

    }

}
