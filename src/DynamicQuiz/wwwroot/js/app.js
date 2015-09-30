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
var answers = new Array(allQuestions.length);
var iQuestion = -1;
var nextBtnNode = document.getElementById('quizNextBtn');
var backBtnNode = document.getElementById('quizBackBtn');
backBtnNode.style.display = '';
var quizButtons = [backBtnNode, nextBtnNode];
backBtnNode.style.display = 'none';
var choicesNode = document.getElementById('choices');
var quizContentNode = document.getElementById('quizContent');

function nextState(event) {
    var prompt = document.getElementById('quizPrompt');
    var target = event.target;

    switch (target.name) {
        case "quizBackBtn":
            iQuestion = iQuestion > 0 ? iQuestion - 1 : iQuestion;
            break;
        case "quizNextBtn":
            iQuestion = iQuestion < allQuestions.length
                ? iQuestion + 1 : iQuestion;
            break;
    }

    if (iQuestion === allQuestions.length - 1) {
        nextBtnNode.value = 'Finish Quiz';
    }
    else if (iQuestion < allQuestions.length - 1) {
        nextBtnNode.value = 'Next';
        if (iQuestion === 0) {
            backBtnNode.style.display = '';
            backBtnNode.disabled = true;
        }
        else {
            backBtnNode.disabled = false;
        }
    }

    // Remove all div child nodes
    while (choicesNode.firstChild) {
        choicesNode.removeChild(choicesNode.firstChild);
    }

    if (iQuestion < allQuestions.length) {
        nextBtnNode.disabled = true;
        var question = allQuestions[iQuestion];
        prompt.textContent = question.question;

        for (var i = 0; i < question.choices.length; i++) {
            var input = document.createElement('input')
            input.type = 'radio';
            input.name = 'answerChoice';
            input.value = i.toString();

            if(answers[iQuestion] === i) {
                input.checked = true;
                nextBtnNode.disabled = false;
            }

            choicesNode.appendChild(input);
            choicesNode.appendChild(document.createTextNode(question.choices[i]));
            choicesNode.appendChild(document.createElement('br'));
        }
    } else {
        for (var i = 0; i < allQuestions.length; i++) {
            nCorrectAnswer = allQuestions[i].correctAnswer === answers[i]
                ? nCorrectAnswer + 1 : nCorrectAnswer;
        }

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
        case "quizBackBtn":
        case "quizNextBtn":
            $(quizContentNode).fadeOut('slow', function () { nextState(event) });
            $(quizContentNode).fadeIn();
            break;
    }
});

choicesNode.addEventListener('change', function (event) {
    var target = event.target;
    if (target.name === 'answerChoice') {
        nextBtnNode.disabled = false;
        var radios = document.getElementsByName('answerChoice');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                answers[iQuestion] = i;
                break;
            }
        }
    }
});