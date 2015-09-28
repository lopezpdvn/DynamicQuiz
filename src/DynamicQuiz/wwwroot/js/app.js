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
]

var nCorrectAnswer = 0;
var iQuestion = -1;

var buttonNode = document.getElementById('quizNextBtn');
buttonNode.addEventListener('click', function (event) {
    var prompt = document.getElementById('quizPrompt');

    if (iQuestion >= 0) {
        var radios = this.parentElement.getElementsByTagName('input');
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
        iQuestion++;
        this.disabled = true;
        var question = allQuestions[iQuestion];
        prompt.textContent = question.question;

        for (var i = 0; i < question.choices.length; i++) {
            var input = document.createElement('input')
            input.type = 'radio';
            input.name = 'question';
            input.value = i.toString();
            var choice = document.createTextNode(question.choices[i]);
            choicesNode.appendChild(input);
            choicesNode.appendChild(document.createTextNode(question.choices[i]));
            choicesNode.appendChild(document.createElement('br'));
        }
        this.text = "Next";
    } else {
        prompt.textContent = "You finished the quiz, your score is "
            + nCorrectAnswer + "/" + allQuestions.length;
        this.disabled = true;
        this.style.display = 'none';
    }
});

var choicesNode = document.getElementById('choices');
choicesNode.addEventListener('click', function (event) {
    var target = event.target;
    switch (target.name) {
        case "question":
            var button = document.getElementById('quizNextBtn');
            button.disabled = false;
            break;
        default:
            break;
    }
});