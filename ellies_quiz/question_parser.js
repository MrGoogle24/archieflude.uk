let questions = [];
let x = 0;
let y = 0;

async function loadJSON() {
    const response = await fetch("questions.json");
    const json = await response.json();

    console.log(json);
    questions = json;
    loadQuestions();

    return json;
}

loadJSON();

function loadQuestions() {
    //DEBUG
    document.getElementById("coords").innerHTML = "x: "+x+" y: "+y;
    document.getElementById("question").innerHTML = questions[x][y].question;
    document.getElementById("answer").innerHTML = questions[x][y].answer;
    document.getElementById("value").innerHTML = questions[x][y].value;
    if (questions[x][y].answered) {
        document.getElementById("answered").innerHTML = "YES";
    } else {
        document.getElementById("answered").innerHTML = "NO";
    }
}


// DEBUG FUNCTIONS!

function changeState() {
    questions[x][y].answered = !questions[0].answered;
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