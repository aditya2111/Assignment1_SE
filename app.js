//single state object used for storing questions and options

var state = {
  questions: [
    {
      question: "1.The language of Lakshadweep, a Union Territory of India, is",
      answers: ["A) Hindi", "B) Malayalam", "C) Tamil", "D) Telugu"],
      answerCorrect: 1,
    },
    {
      question:
        "2.According to the Constitution of India, which of the following is NOT one of the main organs of the Government?",
      answers: [
        "A) Legislature",
        "B) Bureacracy",
        "C) Executive",
        "D) Judiciary",
      ],
      answerCorrect: 1,
    },
    {
      question:
        "3.Lionel Messi is associated with which of the following sports?",
      answers: [
        "A) Motor Racing",
        "B) Lawn Tennis",
        "C) Football",
        "D) Ice Hockey",
      ],
      answerCorrect: 2,
    },
    {
      question:
        "4.New Horizons’ spacecraft was launched by NASA to study which of the following planet?",
      answers: ["A) Pluto", "B) Mars", "C) Mercury", "D) Jupiter"],
      answerCorrect: 0,
    },
    {
      question:
        "5.Boston Tea Party' protest was associated with the revolution of",
      answers: ["A) India", "B) Italy", "C)French ", "D) America"],
      answerCorrect: 3,
    },
    {
      question:
        "6.Who among the following considered as the 'father of artificial intelligence'?",
      answers: [
        "A) Charles Babbage",
        "B) Lee De Forest",
        "C) John McCarthy",
        "D) JP Eckart",
      ],
      answerCorrect: 2,
    },
    {
      question:
        "7.Who among the following was the first recipient of Rajiv Gandhi Khel Ratna Award?",
      answers: [
        "A) Sachin Tendulkar",
        "B) Vishwanathan Anand",
        "C) Karnam Malleswari",
        "D) Saina Nehwal",
      ],
      answerCorrect: 1,
    },
    {
      question:
        "8.In the Kurukshetra war, Arjuna shot arrows at Bhishma hiding behind which character?",
      answers: ["A) Dhrishtadyumna", "B) Satyaki", "C) Virata", "D) Shikhandi"],
      answerCorrect: 3,
    },
    {
      question:
        "9.Who won the Battle of Panipat that was fought in the eighteenth century?",
      answers: [
        "A) Sadeshivrao Bhau",
        "B) Akbar",
        "C) Ahmed Shah Abdall",
        "D) Sher Shah Suri",
      ],
      answerCorrect: 2,
    },
    {
      question:
        "10.Which of these devices convert alternating current or AC into direct current or DC?",
      answers: [
        "A) Rectifier",
        "B) Transformer",
        "C) Inverter",
        "D) Transmitter",
      ],
      answerCorrect: 0,
    },
  ],

  currentQuestion: 0, //used for keeping the count of question number.
  userScore: 0, // used for keeping the count of user's score.
};

//register when start button is clicked and removes div with heading and start button
function clickStart() {
  $(".js-startPage").on("click", "button", function (event) {
    $(".js-startPage").remove();
    $("#question-container").removeClass("hidden");
    $(".js-count").removeClass("hidden");
  });
}

//register when an answer/button has been clicked/chosen by the user
function clickAnswer(chosenElement, state) {
  var chosenAnswer = $(chosenElement).val();

  if (chosenAnswer == state.questions[state.currentQuestion].answerCorrect) {
    state.userScore += 1;
  } else {
    $(`.ans${chosenAnswer}${state.currentQuestion}`).addClass("answer-done");
  }
  $(chosenElement).addClass("selected-answer");

  //add class to the selected-answer so that it will turn yellow
  //remove hover class from button so the selected answer will still stay yellow when you hover over them
  $("button").removeClass("hover");
  $(".result").removeClass("hidden");
  //show continue button
  $(".js-continue").removeClass("hidden");
  //disable the answer buttons so user cannot continue clicking them
  $(".js-answer").attr("disabled", true);
  return state;
}
// register when user clicks continue button after each question
function clickContinue(state) {
  //increment which question user is on by one when continue is clicked
  state.currentQuestion += 1;
  //hide continue button and result again, remove questions and answer
  $(".js-continue").addClass("hidden");
  $(".result").addClass("hidden");
  $("section").remove();

  //if quiz is done insert "you're done" and user's score
  //remove question count
  if (state.currentQuestion > 9) {
    $("body").append(
      '<h1 class="end" >You\'re done!</h1><p class ="endScore">You scored ' +
        state.userScore +
        " out of " +
        state.currentQuestion
    );
    $(".js-count").remove(); // //remove question count
    $("#list").removeClass("hidden"); //display correct answers
    $(".retry").removeClass("hidden"); //display play again button
    $(".answer-done").removeClass("hidden"); //display user responses
  } else {
    //if quiz is not done insert new question and answers and update user score and question count
    $("#question-container").append(
      "<section class = 'question-container col-8'>" +
        "<p class='question'>" +
        state.questions[state.currentQuestion].question +
        "</p><br>" +
        "<button class='button0 js-answer hover' value = '0'>" +
        state.questions[state.currentQuestion].answers[0] +
        "</button>" +
        "<button class='button1 js-answer hover' value = '1'>" +
        state.questions[state.currentQuestion].answers[1] +
        "</button><br>" +
        "<button class='button2 js-answer hover' value = '2'>" +
        state.questions[state.currentQuestion].answers[2] +
        "</button>" +
        "<button class='button3 js-answer hover' value = '3'>" +
        state.questions[state.currentQuestion].answers[3] +
        "</button>" +
        "</section>"
    );
    $(".js-count").text(
      "Question: " + (state.currentQuestion + 1) + "/" + state.questions.length // displaying question no. at each page
    );
  }
}

$(function () {
  clickStart();
  $("#question-container").on("click", "button", function (event) {
    clickAnswer($(this), state);
  });

  $(".js-continue").click(function (event) {
    clickContinue(state);
  });
});
