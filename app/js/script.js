/*


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
var $leftPriceText = $('#left-price-text');
var $rightPic = $('#right-pic');
var $rightItemName = $('#right-item-name');
var $rightItemPrice = $('#right-item-price');
var $rightPriceText = $('#right-price-text');
var $itemValue = $('.item-value');
var $itemValueSpan = $('.item-value-span');
var $more = $('#more');
var $less = $('#less');
var $same = $('#same');
var $scoreText = $('#score-text');
var $gameButtons = $('#game-buttons');
var $endGameButtons = $('#end-game-buttons');
var $playAgain = $('#play-again');
var playing = true;


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

function computeAnswer(priceLeft, priceRight) {
    var answer;
    if (priceLeft === priceRight) {
        answer = 'same';
    } else {
        answer = priceRight > priceLeft ? 'more' : 'less';
    }

    return answer;
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

var update = function(input) {

    if (input != null) {

        $leftPriceText.text(productOne.price);
        $rightPriceText.text(productTwo.price);
        $itemValue.removeClass('hidePrice');

        var priceLeft = parseFloat(productOne.price);
        var priceRight = parseFloat(productTwo.price);
        var userAnswer = options[input];
        var correctAnswer = computeAnswer(priceLeft, priceRight);

        if (userAnswer === correctAnswer) {
            score++;
        } else {
            playing = false;
            $gameButtons.fadeOut(900);

            setTimeout(function() {
                $endGameButtons.removeClass('hidden');
                $endGameButtons.fadeIn(2000);
            }, 1000);
        }

    }

    if (playing) {

        setTimeout(function() {
            $itemValue.addClass('hidePrice');
        }, 900);

        $scoreText.text(score);

        setTimeout(function() {

            index = generateRandomNumber(jsonData.length);
            [indexOne, indexTwo] = index;
            [productOne, productTwo] = [jsonData[indexOne], jsonData[indexTwo]];

            $leftPic.attr('src', productOne.src);
            $rightPic.attr('src', productTwo.src);
            $leftItemName.html('<p>' + productOne.name + '</p>');
            $rightItemName.html('<p>' + productTwo.name + '</p>');

            var gradientIndex = generateRandomNumber(gradients.length)[0];

            $leftCol.css({'background-color' : gradients[gradientIndex][0]});
            $rightCol.css({'background-color' : gradients[gradientIndex][1]});
            console.log(gradientIndex);
        }, 1500);
    }

}

$playAgain.on('click', function() {
    window.location.reload(true);
});
