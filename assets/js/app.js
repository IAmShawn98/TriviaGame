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
            time.text("Time Remaining: " + secondsLeft--);
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
                // The correct answer.
                correctAnswer: "Spunky"
            }
        ];

        // If the player wins, do this.
        var playerCorrect = function () {
            alert("WIN!");
        }

        // If the player sucks, do this.
        var playerIncorrect = function () {
            alert("LOSS!");
        }


        // This function assembles the question we will display in HTML.
        var buildHTMLQuestions = function (i) {
            // Display the question according to the position of our iterator in the 'triviaQuestions' array.
            $('#questionPopulation').append('<div id="playerQuestion" class="text-info"><h4>' + triviaQuestions[i].question + '</div>');
            // Display the multiple choice answers according to the position of our iterator in the 'triviaQuestions' array.
            $('#choicePopulation').append('<label class="label_item" for="radio1"><img width="60" height="60" src="assets/images/decorations/orangeSoda.png"></label> <input type="radio" id="radio1" class="radio_item" name="multipleChoice" value="' + triviaQuestions[i].choices[0] + '" checked="yes"><span class="text-warning font-weight-bold"> ' + triviaQuestions[i].choices[0] + '</span><br>');
            $('#choicePopulation').append('<label class="label_item" for="radio2"><img width="60" height="60" src="assets/images/decorations/orangeSoda.png"></label> <input type="radio" id="radio2" class="radio_item" name="multipleChoice" value="' + triviaQuestions[i].choices[1] + '" checked="yes"><span class="text-warning font-weight-bold"> ' + triviaQuestions[i].choices[1] + '</span><br>');
            $('#choicePopulation').append('<label class="label_item" for="radio3"><img width="60" height="60" src="assets/images/decorations/orangeSoda.png"></label> <input type="radio" id="radio3" class="radio_item" name="multipleChoice" value="' + triviaQuestions[i].choices[2] + '" checked="yes"><span class="text-warning font-weight-bold"> ' + triviaQuestions[i].choices[2] + '</span><br>');
            $('#choicePopulation').append('<label class="label_item" for="radio4"><img width="60" height="60" src="assets/images/decorations/orangeSoda.png"></label> <input type="radio" id="radio4" class="radio_item" name="multipleChoice" value="' + triviaQuestions[i].choices[3] + '" checked="yes"><span class="text-warning font-weight-bold"> ' + triviaQuestions[i].choices[3] + '</span><br> <br>');
            // 5.) Once the player picks the answer they believe to be correct, let the player submit it.
            // Submit Button.
            $('#submitPopulation').append('<button type="submit" class="btn btn-warning text-white p-3 font-weight-bold" id="submitButton">Submit</button>');

            // 6.) If the player picks the correct answer, let them know, wait five seconds, then continue.
            $('#submitButton').click(function () {
                if ($('input:radio[name=multipleChoice]:checked').val() === triviaQuestions[i].correctAnswer) {
                    playerCorrect();
                } else {
                    // 7.) If the players answer is incorrect, let them know, wait five seconds, then continue.
                    playerIncorrect();
                }
            })
        }
        // Start the question array iterator at zero to properly define which question to start with in the array.
        buildHTMLQuestions(questionNumber);

        // When the player clicks on an orange soda, turn it into a checkmark.
        $("img").on("click", function () {
            $(this).attr('src', 'assets/images/decorations/tick.png');
        });
    }
});


