import theme_1 from './theme_1.json' with {type: 'json'};
import theme_2 from './theme_2.json' with {type: 'json'};
import theme_3 from './theme_3.json' with {type: 'json'};
import theme_4 from './theme_4.json' with {type: 'json'};
import theme_5 from './theme_5.json' with {type: 'json'};

let x = 0;

let current_theme = 0;
let current_x = 0;
let current_button = null; // track which button is currently active

const pointValues = [100, 200, 400, 800, 1000, 2000];

async function setQuestionValue(x) {
    const value = pointValues[x];
    await fetch('/admin/set-question-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
    });
}

function showQuestion(button, x, theme) {
    current_x = x
    current_theme = theme;
    current_button = button; // remember which button triggered this
    setQuestionValue(x);
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
    }

    // grey out and disable the button now that it's been answered
    if (current_button) {
        current_button.disabled = true;
        current_button.style.backgroundColor = "#555";
        current_button.style.color = "#999";
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "a") {
        showAnswer(x, current_theme)
    }
})

function closeQuestion() {
    const el = document.getElementsByClassName("question-container")[0];
    el.style.visibility = "hidden";
}

window.closeQuestion = closeQuestion;

window.showQuestion = showQuestion;