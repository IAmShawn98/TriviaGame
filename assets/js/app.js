$(document).ready(function () {

    // Global Variables.
    var secondsLeft = 20 // The amount of time left in each new trivia session.
    var correctAnswers = 0; // The players total correct answers.
    var incorrectAnswers = 0; // The players total incorrect answers.
    var questionNumber = 0; // The question number the player is on in the array.

    // Define Elements.
    var time = $("#timeRemaining p"); // The timer element.
    var pCorrectAnswers = $(".pCorrectAnswers"); // The correct answer element.
    var pIncorrectAnswers = $(".pIncorrectAnswers"); // The incorrect answer element.
    var vid = document.getElementById("correctVideo"); // Play a random clip when the player wins.

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
            },
            {
                // Question being asked to the player.
                question: "In which cartoon was the main character nicknamed 'Football Head'?",
                //  4.) Multiple choice questions for the player to pick from.
                choices: ["Hey Jerry", "Hey Dude", "Hey Arnold", "Sup Brotha"],
                // The correct answer.
                correctAnswer: "Hey Arnold"
            },
            {
                // Question being asked to the player.
                question: "In Doug, what was the name of the school bully?",
                //  4.) Multiple choice questions for the player to pick from.
                choices: ["Henry", "Ross", "Rick", "Roger"],
                // The correct answer.
                correctAnswer: "Roger"
            },
            {
                // Question being asked to the player.
                question: "Who sung the 'Happy, Happy, Joy, Joy' song from 'The Ren and Stimpy Show'?",
                //  4.) Multiple choice questions for the player to pick from.
                choices: ["Furry Waffleneck", "Smelly Stinkyteets", "Professor Wiggles", "Stinky Wizzleteats"],
                // The correct answer.
                correctAnswer: "Stinky Wizzleteats"
            },
            {
                // Question being asked to the player.
                question: "In Rockos Modern Life, what was the name of the Dark Underlord?",
                //  4.) Multiple choice questions for the player to pick from.
                choices: ["Graig", "Grim", "Paul", "Peaches"],
                // The correct answer.
                correctAnswer: "Peaches"
            },
            {
                // Question being asked to the player.
                question: "When was the first ever airing of 'Spongebob Squarepants'?",
                //  4.) Multiple choice questions for the player to pick from.
                choices: ["May 1, 1999", "July 3, 1998", "April 7, 1997", "March 2, 1999"],
                // The correct answer.
                correctAnswer: "May 1, 1999"
            },
            {
                // Question being asked to the player.
                question: "In 'Aaahh!!! Real Monsters' which monster held his eyeballs?",
                //  4.) Multiple choice questions for the player to pick from.
                choices: ["Graig", "Krumm", "Ickis", "Oblina"],
                // The correct answer.
                correctAnswer: "Krumm"
            },
        ];

        // If the player finishes the game, do this.
        var endGameResults = function () {
            // Hide game.
            $("#game").hide();
            // Show score.
            $("#resultMenu").show();
        }

        // If the player wins, do this.
        var playerCorrect = function () {
            // Start correct answer video.
            vid.play()
            // Hide game.
            $("#game").hide();
            // Show score so far.
            $("#currentScore").show();
            // wait five seconds!
            console.log("Win Condition: Playing video, waiting five seconds...")
            setTimeout(() => {
                // Remove finished video.
                $('#populateNextQuestionBtn')
                    .append('<button class="btn btn-warning text-white p-3 font-weight-bold" id="nextQuestion">Next Question</button>');

                // When the player clicks on the next question, empty out the old questions and continue the game.
                $('#nextQuestion').click(function () {
                    $("#questionPopulation").empty();
                    $("#choicePopulation").empty();
                    $("#submitPopulation").empty();
                    // Show game.
                    $("#game").show();
                    // Hide score so far.
                    $("#currentScore").hide();
                    questionNumber++;
                    buildHTMLQuestions(questionNumber);
                })
            }, 5000);
        }

        // If the player sucks, do this.
        var playerIncorrect = function () {
            alert("LOSS!");
        }

        // This function assembles the question we will display in HTML.
        var buildHTMLQuestions = function (i) {
            // Display the question according to the position of our iterator in the 'triviaQuestions' array.
            $('#questionPopulation').append('<div id="playerQuestion" class="text-info"><h4>' + triviaQuestions[i].question + '</div>');
            for (var index = 0; index < triviaQuestions[i].choices.length; index++) {
                $('#choicePopulation').append('<label class="label_item" for="radio' + index + 1 + '"><img width="60" height="60" src="assets/images/decorations/orangeSoda.png"></label> <input type="radio" id="radio' + index + 1 + '" class="radio_item" name="multipleChoice" value="' + triviaQuestions[i].choices[index] + '" checked="yes"><span class="text-warning font-weight-bold"> ' + triviaQuestions[i].choices[index] + '</span><br>');

            }

            // 5.) Once the player picks the answer they believe to be correct, let the player submit it.
            // Submit Button.
            $('#submitPopulation').append('<button type="submit" class="btn btn-warning text-white p-3 font-weight-bold" id="submitButton">Submit</button>');

            // 6.) If the player picks the correct answer, let them know, wait five seconds, then continue.
            $('#submitButton').click(function () {
                if ($('input:radio[name=multipleChoice]:checked').val() === triviaQuestions[i].correctAnswer) {
                    // Increment the players score.
                    pCorrectAnswers.text = correctAnswers++;
                    // Populate it to the DOM.
                    $(".pCorrectAnswers").text("Correct Answers: " + correctAnswers);
                    // Show the player their score so far.

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


