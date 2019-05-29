$(document).ready(function () {

    // Global Variables.
    var secondsLeft = 20 // The amount of time left in each new trivia session.
    var correctAnswers = 0; // The players total correct answers.
    var incorrectAnswers = 0; // The players total incorrect answers.
    var questionNumber = 0; // The question number the player is on in the array.

    // Define Elements.
    var time = $("#timeRemaining p"); // The timer element.

    // When the player clicks on 'Play Now!' a new trivia session is created by the function 'newTriviaSession()'.
    $("#playNow").on("click", function () {
        $("#selectMenu").hide(); // Hides the seletion menu.
        $("#game").show(); // Shows the game area.

        // Starts trivia app functionality.
        newTriviaSession();
    })

    // 1.) Create a function that begins the trivia games functionality.
    function newTriviaSession() {

        // 2.) Create a countdown timer that gives the player a limited amount of time to complete a question.

        // Timer: Deducts seconds from the 'seconds' variable.
        var timeRemaining = setInterval(function () {
            // Deduct time from player.
            time.text(secondsLeft--);
            // PLUS: If the player runs out of time for a question, let them know, wait five seconds, then continue.
            if (secondsLeft === -1) {
                // alert("Times Up!");
                clearInterval(timeRemaining);
            }
        }, 1000);

        // This array contains every question in this trivia game, including multiple choices and the determined correct answer.
        var triviaQuestions = [
            {
                // Question being asked to the player.
                question: "In Rocko's Modern Life, what is the name of Rocko's pet dog?",
                //  4.) Multiple choice questions for the player to pick from.
                choices: ["Jeffery", "Spud", "Skelly", "Spunky"],
                // The correct answer is equal to the position in the array index.
                answer: 3
            }
        ];

        // This function assembles the question we will display in HTML.
        var buildHTMLQuestions = function (i) {
            // Display the question according to the position of our iterator in the 'triviaQuestions' array.
            $('#questionPopulation').append('<div id="playerQuestion" class="text-info"><h4>' + triviaQuestions[i].question + '</div>');
            // Display the multiple choice answers according to the position of our iterator in the 'triviaQuestions' array.
            $('#choicePopulation').append('<input type="radio" name="questionChoices" value="' + triviaQuestions[i].choices[0] + '" checked="yes">' + triviaQuestions[i].choices[0] + '</input>');
            $('#choicePopulation').append('<input type="radio" name="questionChoices" value="' + triviaQuestions[i].choices[1] + '" checked="yes">' + triviaQuestions[i].choices[1] + '</input>');
            $('#choicePopulation').append('<input type="radio" name="questionChoices" value="' + triviaQuestions[i].choices[2] + '" checked="yes">' + triviaQuestions[i].choices[2] + '</input>');
            $('#choicePopulation').append('<input type="radio" name="questionChoices" value="' + triviaQuestions[i].choices[3] + '" checked="yes">' + triviaQuestions[i].choices[3] + '</input>');

            // 5.) Once the player picks the answer they believe to be correct, let the player submit it.

            // Submit Button.
            $('#btnSubmit').append('<button id="submitButton">Submit</button>');

            // 6.) If the players answer is correct, congradulate them, wait five seconds, then continue.

            // 7.) If the players answer is incorrect, let them know, wait five seconds, then continue.

        }
        // Start the question array iterator at zero to properly define which question to start with in the array.
        buildHTMLQuestions(questionNumber);
    }
});


