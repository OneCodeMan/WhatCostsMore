var $leftcol = $("#left-col");
var $rightcol = $("#right-col");
// var $bothCols = [$leftcol, $rightcol];

function generateRandomNumber(length) {
    var index = Math.floor(Math.random() * (length - 1));
    return index;
}

var gradientIndex = generateRandomNumber(gradients.length);

$leftcol.css({"background-color" : gradients[gradientIndex][0]});
$rightcol.css({"background-color" : gradients[gradientIndex][1]});
