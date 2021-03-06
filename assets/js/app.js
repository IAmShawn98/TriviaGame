$(document).ready(function () {

    // Global Variables.
    var secondsLeft = 38 // The amount of time left in each new trivia session.
    var correctAnswers = 0; // The players total correct answers.
    var incorrectAnswers = 0; // The players total incorrect answers.
    var questionNumber = 0; // The question number the player is on in the array.
    var isPaused = false; // Flag to check if the timer is paused or not.

    // Define Elements.
    var time = $("#timeRemaining p"); // The timer element.
    var pCorrectAnswers = $(".pCorrectAnswers"); // The correct answer element.
    var pIncorrectAnswers = $(".pIncorrectAnswers"); // The incorrect answer element.
    var correctVid = document.getElementById("correctVideo"); // video player element.
    var incorrectVid = document.getElementById("incorrectVideo"); // video player element.
    var triviaPercentScore = $("#triviaPercentScore"); // The trivia score percent element.

    // When the player clicks on 'Play Now!' a new trivia session is created by the function 'newTriviaSession()'.
    $("#playNow").on("click", function () {
        $("#selectMenu").hide(); // Hides the seletion menu.
        $("#game").show(); // Shows the game area.

        // Starts trivia app functionality.
        newTriviaSession();
    })

    // This function begins the app functionality.
    function newTriviaSession() {

        // This is where we call our countdown timer, giving the player a limited amount of time to answer questions.

        // Timer: Deducts seconds from the 'seconds' variable.
        var timeRemaining = setInterval(function () {
            // Deduct time from player.
            time.text("Time Remaining: " + secondsLeft--);
            // PLUS: If the player runs out of time for a question, let them know, wait five seconds, then continue.
            if (secondsLeft === -1) {
                // alert("Times Up!");
                clearInterval(timeRemaining);
                $(".alert").show();
                endGameResults();
            } else if (isPaused === true) {
                clearInterval(timeRemaining);
            } else if (!isPaused === true) {
                console.log("Counting Down....");
            }
        }, 1000);

        // This array contains every question in this trivia game, including multiple choices and the determined correct answer.
        var triviaQuestions = [
            {
                // Question being asked to the player.
                question: "In Rocko's Modern Life, what is the name of Rocko's pet dog?",
                //  Multiple choice questions for the player to pick from.
                choices: ["Jeffery", "Spud", "Skelly", "Spunky"],
                // The correct answer.
                correctAnswer: "Spunky"
            },
            {
                // Question being asked to the player.
                question: "In which cartoon was the main character nicknamed 'Football Head'?",
                //  Multiple choice questions for the player to pick from.
                choices: ["Hey Jerry", "Hey Dude", "Hey Arnold", "Sup Brotha"],
                // The correct answer.
                correctAnswer: "Hey Arnold"
            },
            {
                // Question being asked to the player.
                question: "In Doug, what was the name of the school bully?",
                // Multiple choice questions for the player to pick from.
                choices: ["Henry", "Ross", "Rick", "Roger"],
                // The correct answer.
                correctAnswer: "Roger"
            },
            {
                // Question being asked to the player.
                question: "Who sung the 'Happy, Happy, Joy, Joy' song from 'The Ren and Stimpy Show'?",
                // Multiple choice questions for the player to pick from.
                choices: ["Furry Waffleneck", "Smelly Stinkyteets", "Professor Wiggles", "Stinky Wizzleteats"],
                // The correct answer.
                correctAnswer: "Stinky Wizzleteats"
            },
            {
                // Question being asked to the player.
                question: "In Rockos Modern Life, what was the name of the Dark Underlord?",
                // Multiple choice questions for the player to pick from.
                choices: ["Graig", "Grim", "Paul", "Peaches"],
                // The correct answer.
                correctAnswer: "Peaches"
            },
            {
                // Question being asked to the player.
                question: "When was the first ever airing of 'Spongebob Squarepants'?",
                // Multiple choice questions for the player to pick from.
                choices: ["May 1, 1999", "July 3, 1998", "April 7, 1997", "March 2, 1999"],
                // The correct answer.
                correctAnswer: "May 1, 1999"
            },
            {
                // Question being asked to the player.
                question: "In 'Aaahh!!! Real Monsters' which monster held his eyeballs?",
                // Multiple choice questions for the player to pick from.
                choices: ["Graig", "Krumm", "Ickis", "Oblina"],
                // The correct answer.
                correctAnswer: "Krumm"
            },
            {
                // Question being asked to the player.
                question: "In 'Rugrats' what was the name of the doctor Didi heavily relied on for child support?",
                //  Multiple choice questions for the player to pick from.
                choices: ["Dr. LumpNuts", "Professor Uncle", "Dr. Slipshiz", "Dr. Lipschitz"],
                // The correct answer.
                correctAnswer: "Dr. Lipschitz"
            },
        ];

        // If the player finishes the game, do this.
        var endGameResults = function () {
            // Hide game.
            $("#game").hide();
            // Show score.
            $("#resultMenu").show();
            // Populate Players Trivia Percentage & Letter Grade.
            triviaPercentScore.text(100 / 8 * correctAnswers + "%");
        }

        // If the player wins, do this.
        var playerCorrect = function () {
            // Start correct answer video.
            correctVid.play()
            // Hide game.
            $("#game").hide();
            // Show score so far.
            $("#currentScoreWin").show();
            // wait five seconds!
            setTimeout(() => {
                // Remove finished video.
                $('.populateNextQuestionBtn')
                    .append('<button class="btn btn-warning text-white p-3 font-weight- nextQuestion">Next Question</button>');

                // When the player clicks on the next question, empty out the old questions and continue the game.
                $('.nextQuestion').click(function () {
                    // Clear Last Question
                    $("#questionPopulation").empty();
                    // Clear last round of multiple choice answers.
                    $("#choicePopulation").empty();
                    // Clear last submit population.
                    $("#submitPopulation").empty();
                    // Clear last next question button population.
                    $(".populateNextQuestionBtn").empty();
                    // Hide score so far.
                    $("#currentScoreWin").hide();
                    // Show game.
                    $("#game").show();
                    // Increment the value of the question array so the game lets the player move on.
                    questionNumber++;
                    // If the player comes to the end of the question array, show the result screen.
                    if (questionNumber === 8) {
                        endGameResults();
                    } else {
                        // Otherwise, continue to the next question.
                        isPaused = false;
                        var timeRemaining = setInterval(function () {
                            // Deduct time from player.
                            time.text("Time Remaining: " + secondsLeft--);
                            // PLUS: If the player runs out of time for a question, let them know, wait five seconds, then continue.
                            if (secondsLeft === -1) {
                                // alert("Times Up!");
                                clearInterval(timeRemaining);
                                endGameResults();
                            } else if (isPaused === true) {
                                clearInterval(timeRemaining);
                            } else if (!isPaused === true) {
                                console.log("Counting Down....");
                            }
                        }, 1000);
                        buildHTMLQuestions(questionNumber);
                    }
                })
            }, 5000);
        }

        // If the player sucks, do this.
        var playerIncorrect = function () {
            // Start incorrect answer video.
            incorrectVid.play()
            // Hide game.
            $("#game").hide();
            // Show score so far.
            $("#currentScoreLoss").show();
            // wait five seconds!
            setTimeout(() => {
                // Remove finished video.
                $('.populateNextQuestionBtn')
                    .append('<button class="btn btn-warning text-white p-3 font-weight-bold nextQuestion">Next Question</button>');

                // When the player clicks on the next question, empty out the old questions and continue the game.
                $('.nextQuestion').click(function () {
                    // Clear Last Question
                    $("#questionPopulation").empty();
                    // Clear last round of multiple choice answers.
                    $("#choicePopulation").empty();
                    // Clear last submit population.
                    $("#submitPopulation").empty();
                    // Clear last next question button population.
                    $(".populateNextQuestionBtn").empty();
                    // Hide score so far.
                    $("#currentScoreLoss").hide();
                    // Show game.
                    $("#game").show();
                    // Increment the value of the question array so the game lets the player move on.
                    questionNumber++;
                    // If the player comes to the end of the question array, show the result screen.
                    if (questionNumber === 8) {
                        endGameResults();
                    } else {
                        // Otherwise, continue to the next question.
                        isPaused = false;
                        var timeRemaining = setInterval(function () {
                            // Deduct time from player.
                            time.text("Time Remaining: " + secondsLeft--);
                            // PLUS: If the player runs out of time for a question, let them know, wait five seconds, then continue.
                            if (secondsLeft === -1) {
                                // alert("Times Up!");
                                clearInterval(timeRemaining);
                                endGameResults();
                            } else if (isPaused === true) {
                                clearInterval(timeRemaining);
                                console.log("Timer: Counter Paused!");
                            } else if (!isPaused === true) {
                                console.log("Timer: Counting Down....");
                            }
                        }, 1000);
                        buildHTMLQuestions(questionNumber);
                    }
                })
            }, 5000);
        }

        // This function assembles the question we will display in HTML.
        var buildHTMLQuestions = function (i) {
            // Display the question according to the position of our iterator in the 'triviaQuestions' array.
            $('#questionPopulation').append('<div id="playerQuestion" class="text-info"><h4>' + triviaQuestions[i].question + '</div>');
            for (var index = 0; index < triviaQuestions[i].choices.length; index++) {
                $('#choicePopulation').append('<label class="label_item" for="radio' + index + 1 + '"><img class="imageTick" width="60" height="60" src="assets/images/decorations/orangeSoda.png"></label> <input type="radio" id="radio' + index + 1 + '" class="radio_item" name="multipleChoice" value="' + triviaQuestions[i].choices[index] + '" checked="yes"><span class="text-warning font-weight-bold"> ' + triviaQuestions[i].choices[index] + '</span><br>');
            }

            // When the player clicks on an orange soda, turn it into a checkmark.
            $(".imageTick").on("click", function () {
                $(this).attr('src', 'assets/images/decorations/tick.png');
            });

            // Once the player picks the answer they believe to be correct, let the player submit it.

            // Submit Button.
            $('#submitPopulation').append('<button type="submit" class="btn btn-warning text-white p-3 font-weight-bold" id="submitButton">Submit</button>');

            // If the player picks the correct answer, let them know, wait five seconds, then continue.
            $('#submitButton').click(function () {
                if ($('input:radio[name=multipleChoice]:checked').val() === triviaQuestions[i].correctAnswer) {
                    // Increment the players score.
                    pCorrectAnswers.text = correctAnswers++;
                    // Populate it to the DOM.
                    $(".pCorrectAnswers").text("Correct Answers: " + correctAnswers);
                    // Congradulate player!
                    isPaused = true;
                    playerCorrect();
                } else {
                    // If the players answer is incorrect, let them know, wait five seconds, then continue.
                    // Increment the players loss counter.
                    pIncorrectAnswers.text = incorrectAnswers++;
                    // Populate it to the DOM.
                    $(".pIncorrectAnswers").text("Incorrect Answers: " + incorrectAnswers);
                    // Disappoint Player.
                    isPaused = true;
                    playerIncorrect();
                }
            })
        }
        // Start the question array iterator at zero to properly define which question to start with in the array.
        buildHTMLQuestions(questionNumber);
    }
});


