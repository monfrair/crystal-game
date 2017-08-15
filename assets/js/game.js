$(document).ready(function () {

    //    this is the array of photos for the crystals
    var crystals = ['assets/images/bluecrystal.jpg', 'assets/images/blackcrystal.jpg', 'assets/images/redcrystal.jpg', 'assets/images/purplecrystal.jpeg'];

    //    declaring the variables for counter, wins and losses
    var counter = 0,
        wins = 0,
        losses = 0;

    $('#win').text(wins);
    $('#loss').text(losses);

    theCrystals();  //calls theCrystals function
    theGame();      //calls theGame function

    
    //theCrystals function
    function theCrystals() { //loop makes sure no duplicate numbers
        var numbers = [];  //create array for random numbers
        while (numbers.length < 4) { //4 numbers for 4 crystals
            var randomnumber = Math.ceil(Math.random() * 9);
            var found = false; //make sure crystals not same number
            for (var i = 0; i < numbers.length; i++) { //loop makes sure no duplicate numbers
                if (numbers[i] === randomnumber) {
                    found = true;
                    break //if numbers for crystals are unique this loop ends
                }
            }
            if (!found) numbers[numbers.length] = randomnumber;
        }
        console.log(numbers); //console log  4 random numbers

        //this loop first assigns images values then places images on page and provides attributes to images
        for (i = 0; i < numbers.length; i++) {
            var imageCrystal = $('<img>');
            imageCrystal.attr('data-num', numbers[i]); 
            imageCrystal.attr('src', crystals[i]);
            imageCrystal.attr('alt', 'crystals');
            imageCrystal.addClass('crystalImage')
            $('#crystals').append(imageCrystal);
        }
    }

    function theGame() {

        counter = 0;
        $('#yourScore').text(counter);  //counts your total score

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        //This will create the random min and max for the numberToGuess
        var numberToGuess = randomIntFromInterval(21, 99);

        $('.value').text(numberToGuess);


        $('.crystalImage').on('click', function () {
            counter = counter + parseInt($(this).data('num'));

            $('#yourScore').text(counter);

            //if your get the correct score this will notify you win, add to your wins and start a new game
            if (counter === numberToGuess) {
                $('#status').text('You win!');
                wins++;
                $('#win').text(wins);
                console.log(wins)
                $('#crystals').empty();
                theCrystals();
                theGame();

            } else if (counter > numberToGuess) {
                $('#status').text('You lose!')
                losses++;
                $('#loss').text(losses);
                console.log(losses)
                $('#crystals').empty();
                theCrystals();
                theGame();
            }
        });
    }

});
