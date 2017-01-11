/*
TODO: Remove button group on loss, buttons to play again
TODO: Add some sort of milestone winning screen
TODO: Add links to github, tumblr, codepen, and medium.
TODO: Add animations (fade in products, fade out)
TODO: Hide the prices
TODO: Add more gradients. 50 more.
TODO: Improve the UI/UX.

notes: toFixed() returns a string..
*/
var $priceText = $('.price-text');
var $picDiv = $('.pic-div');
var $itemNameDiv = $('.item-name-div');
var $leftCol = $('#left-col');
var $rightCol = $('#right-col');
var $leftPic = $('#left-pic');
var $leftItemName = $('#left-item-name');
var $leftItemPrice = $('#left-item-price');
var $rightPic = $('#right-pic');
var $rightItemName = $('#right-item-name');
var $rightItemPrice = $('#right-item-price');
var $more = $('#more');
var $less = $('#less');
var $same = $('#same');
var $scoreText = $('#score-text');

var score = 0;
var options = ['more', 'less', 'same'];
var jsonUrl = 'https://api.myjson.com/bins/t9t4f';

function generateRandomNumber(length) {
    var firstRandNum = Math.floor(Math.random() * (length - 1));
    var secondRandNum = Math.floor(Math.random() * (length - 1));

    while (firstRandNum === secondRandNum) {
        secondRandNum = Math.floor(Math.random() * (length - 1));
    }

    return [firstRandNum, secondRandNum];
}

$.ajax({
    url: jsonUrl,
    type: 'GET',
    success: function(data) {
        jsonData = data;

        $more.on('click', function() {
            update(0);
        });

        $less.on('click', function() {
            update(1);
        });

        $same.on('click', function() {
            update(2);
        });


        update(null);

    },
    error: function(jqXHR, error) {
        console.log('ERROR OCCURED: ', error);
    },
});

function computeAnswer(priceLeft, priceRight) {
    var answer;
    if (priceLeft === priceRight) {
        answer = 'same';
    } else {
        answer = priceRight > priceLeft ? 'more' : 'less';
    }

    return answer;
}

var update = function(input) {

    if (input != null) {
        var priceLeft = parseFloat(productOne.price);
        var priceRight = parseFloat(productTwo.price);
        var userAnswer = options[input];
        var correctAnswer = computeAnswer(priceLeft, priceRight);

        if (userAnswer === correctAnswer) {
            score++;
        } else {
            alert("you lost!");
        }

    }

    $scoreText.text(score);

    index = generateRandomNumber(jsonData.length);
    [indexOne, indexTwo] = index;
    [productOne, productTwo] = [jsonData[indexOne], jsonData[indexTwo]];

    // the pics are higher because they need the most time to load
    $leftPic.attr('src', productOne.src);
    $rightPic.attr('src', productTwo.src);

    $leftItemName.html('<p>' + productOne.name + '</p>');
    $leftItemPrice.html('<p>$' + productOne.price + '</p>');

    $rightItemName.html('<p>' + productTwo.name + '</p>');
    $rightItemPrice.html('<p>$' + productTwo.price + '</p>');

    var gradientIndex = generateRandomNumber(gradients.length)[0];

    $leftCol.css({'background-color' : gradients[gradientIndex][0]});
    $rightCol.css({'background-color' : gradients[gradientIndex][1]});

}
