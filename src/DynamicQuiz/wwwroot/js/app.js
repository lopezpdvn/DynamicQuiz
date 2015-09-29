var allQuestions = [
    {
        question: "How many days are in a week?",
        choices: ["1", "10", "5", "7"],
        correctAnswer: 3
    },
    {
        question: "Hoy many days are in a year?",
        choices: ["423", "365", "345", "234"],
        correctAnswer: 1
    },
    {
        question: "Hoy many minutes are in an hour?",
        choices: ["60", "34", "77", "20"],
        correctAnswer: 0
    },
    {
        question: "What's the current version of ECMAScript?",
        choices: ["4", "5", "6", "7"],
        correctAnswer: 2
    },
];
var nCorrectAnswer = 0;
var answers = [];
var iQuestion = -1;
var nextBtnNode = document.getElementById('quizNextBtn');
var backBtnNode = document.getElementById('quizBackBtn');
var quizButtons = [backBtnNode, nextBtnNode];
backBtnNode.style.display = 'none';
var choicesNode = document.getElementById('choices');
var quizContentNode = document.getElementById('quizContent');

function nextState(event) {
    var prompt = document.getElementById('quizPrompt');
    var target = event.target;

    switch (iQuestion) {
        case -1:
            backBtnNode.disabled = true;
            backBtnNode.style.display = '';
            nextBtnNode.value = "Next";
            break;
        case 0:
            backBtnNode.disabled = false;
            break;
    }

    // Check if answer is correct and keep track
    if (iQuestion >= 0) {
        var radios = target.parentElement.getElementsByTagName('input');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                break;
            }
        }
        nCorrectAnswer = i === allQuestions[iQuestion].correctAnswer
            ? nCorrectAnswer + 1 : nCorrectAnswer;
    }

    // Remove all div child nodes
    while (choicesNode.firstChild) {
        choicesNode.removeChild(choicesNode.firstChild);
    }

    if (iQuestion < allQuestions.length - 1) {
        // Populate next question and answers
        switch (target.name) {
            case "quizBackBtn":
                iQuestion = iQuestion > 0 ? iQuestion - 1 : iQuestion;
                break;
            case "quizNextBtn":
                iQuestion = iQuestion < allQuestions.length - 1
                    ? iQuestion + 1 : iQuestion;
                break;
        }

        nextBtnNode.disabled = true;
        var question = allQuestions[iQuestion];
        prompt.textContent = question.question;

        for (var i = 0; i < question.choices.length; i++) {
            var input = document.createElement('input')
            input.type = 'radio';
            input.name = 'question';
            input.value = i.toString();
            choicesNode.appendChild(input);
            choicesNode.appendChild(document.createTextNode(question.choices[i]));
            choicesNode.appendChild(document.createElement('br'));
        }
    } else {
        // End of test. Show result.
        prompt.textContent = "You finished the quiz, your score is "
            + nCorrectAnswer + "/" + allQuestions.length;

        for (var i = 0; i < quizButtons.length; i++) {
            quizButtons[i].disabled = true;
            quizButtons[i].style.display = 'none';
        }
    }
}

quizContentNode.addEventListener('click', function (event) {
    var target = event.target;
    switch (target.name) {
        case "question":
            nextBtnNode.disabled = false;
            break;
        case "quizBackBtn":
        case "quizNextBtn":
            nextState(event);
            break;
    }
});

choicesNode.addEventListener('change', function (event) {
    var target = event.target;
    switch (target.name) {
        case "question":
            nextBtnNode.disabled = false;
            break;
    }
});