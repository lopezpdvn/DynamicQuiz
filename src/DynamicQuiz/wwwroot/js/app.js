// Only one question is in this array, but you will add all the questions.

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
var iQuestion = 0;

var buttonNode = document.getElementById('quizNextBtn');
buttonNode.addEventListener('click', function (event) {
    var prompt = document.getElementById('quizPrompt');
    if (iQuestion < allQuestions.length) {
        var question = allQuestions[iQuestion];
        prompt.textContent = question.question;
        var choicesNode = this.previousElementSibling();

        for (var i = 0; i < question.choices.length; i++) {
            alert(i);
            var input = document.createElement('input')
            input.type = 'radio';
            input.name = 'question';
            input.value = i.toString();
            var choice = document.createElement('text');
            choice.textContent = question.choices[i];
            input.appendChild(choice);
            choicesNode.appendChild(input);
        }

        this.text = "Next";
        iQuestion++;
    } else {
        prompt.textContent = "You finished the quiz, your score is "
            + nCorrectAnswer + "/" + allQuestions.length;
        this.style.display = 'none';
    }
});