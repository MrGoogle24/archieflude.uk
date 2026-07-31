import theme_1 from './theme_1.json' with {type: 'json'};
import theme_2 from './theme_2.json' with {type: 'json'};
import theme_3 from './theme_3.json' with {type: 'json'};
import theme_4 from './theme_4.json' with {type: 'json'};
import theme_5 from './theme_5.json' with {type: 'json'};
import theme_6 from './theme_6.json' with {type: 'json'};

let x = 0;
let y = 0;

let current_theme = 0;
let current_x = 0;

function showQuestion(x, theme) {
    current_x = x
    current_theme = theme;
    const el = document.getElementsByClassName("question-container")[0];
    console.log(x, theme);
    if (el.style.visibility === "hidden") {
        el.style.visibility = "visible";
    } else {
        el.style.visibility = "hidden";
    }
    switch(theme)
    {
        case 1:
            document.getElementById("question").innerHTML = theme_1[current_x].question;
            break;
        case 2:
            document.getElementById("question").innerHTML = theme_2[current_x].question;
            break;
        case 3:
            document.getElementById("question").innerHTML = theme_3[current_x].question;
            break;
        case 4:
            document.getElementById("question").innerHTML = theme_4[current_x].question;
            break;
        case 5:
            document.getElementById("question").innerHTML = theme_5[current_x].question;
            break;
    }
}

// show answer

function showAnswer(x, theme) {
    switch(theme)
    {
        case 1:
            document.getElementById("question").innerHTML = theme_1[current_x].correct_answer;
            break;
        case 2:
            document.getElementById("question").innerHTML = theme_2[current_x].correct_answer;
            break;
        case 3:
            document.getElementById("question").innerHTML = theme_3[current_x].correct_answer;
            break;
        case 4:
            document.getElementById("question").innerHTML = theme_4[current_x].correct_answer;
            break;
        case 5:
            document.getElementById("question").innerHTML = theme_5[current_x].correct_answer;
            break;
        case 6:
            document.getElementById("question").innerHTML = theme_6[current_x].correct_answer;
            break;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "a") {
        showAnswer(x, current_theme)
    }
})

window.showQuestion = showQuestion;

// DEBUG FUNCTIONS!

function changeState() {
    questions[x][y].answered = !theme_1[0].answered;
    loadQuestions();
}

function nextQuestionSameTheme() {
    y += 1
    loadQuestions();
}

function nextQuestionDifferentTheme() {
    x += 1
    loadQuestions();
}

function prevQuestionSameTheme() {
    y -= 1
    loadQuestions();
}

function prevQuestionDifferentTheme() {
    x -= 1
    loadQuestions();
}