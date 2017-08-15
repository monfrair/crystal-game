$(document).ready(function () {

    //    this is the array of photos for the crystals from the assets folder
    var crystals = ['assets/images/bluecrystal.jpg', 'assets/images/blackcrystal.jpg', 'assets/images/redcrystal.jpg', 'assets/images/purplecrystal.jpeg'];

    //    declaring the variables for counter, wins and losses
    var counter = 0,
        wins = 0,
        losses = 0;

    $('#win').text(wins); //calls the win id from html
    $('#loss').text(losses); //calls the loss id from html

    theCrystals(); //calls theCrystals function
    theGame(); //calls theGame function


    //theCrystals function
    function theCrystals() { //loop makes sure no duplicate numbers
        var numbers = []; //create array for random numbers
        while (numbers.length < 4) { //4 numbers for 4 crystals
            var randomnumber = Math.ceil(Math.random() * 9);  //picks a random number rounds it up and multiplies it by 9, therfore 9 is the highest possible number
            var found = false; //?? what is happening here?
            for (var i = 0; i < numbers.length; i++) { //loop makes sure no duplicate numbers
                if (numbers[i] === randomnumber) { //checks to make sure each crystal has a different number
                    found = true;
                    break //if numbers for each crystal is unique this loop ends
                }
            }
            if (!found) numbers[numbers.length] = randomnumber; //making sure amount of random numbers matched length of numbers array (4)
        }
        console.log(numbers); //console logs  4 random numbers into the console

        //this loop first assigns the images values then places images on page and provides attributes to images
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

        counter = 0;  //sets initial counter to zero
        $('#yourScore').text(counter); //counts your total score and adds it onto DOM

        function randomIntFromInterval(min, max) { //chooses random number from numberToGuess variable
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        //This will create the random min and max for the numberToGuess
        var numberToGuess = randomIntFromInterval(21, 99);

        $('.value').text(numberToGuess);


        $('.crystalImage').on('click', function () {
            counter = counter + parseInt($(this).data('num'));

            $('#yourScore').text(counter);

            //if your get the correct score this will notify you win, add to your wins and start a new game calling on theCrystals and theGame functions
            if (counter === numberToGuess) {
                $('#status').text('You win!');
                wins++;
                $('#win').text(wins);
                console.log(wins)
                $('#crystals').empty();
                theCrystals();
                theGame();


                //if you get the wrong score this will add to your losses and and start a new game calling on theCrystals and theGame functions
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
