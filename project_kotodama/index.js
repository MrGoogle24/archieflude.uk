let allCards = [];
let currentCard = null;
let cardStats = JSON.parse(localStorage.getItem('kotodama_stats')) || {};

async function init() {
    const files = [
        'data/hiragana.json',
        'data/katakana.json',
        'data/vocab_core.json',
        'data/vocab_ext.json'
    ];

    try {
        const responses = await Promise.all(files.map(f => fetch(f).catch(e => {
            console.warn(`Could not load ${f}:`, e);
            return null;
        })));

        const dataArrays = (await Promise.all(
            responses
                .filter(res => res !== null && res.ok)
                .map(res => res.json())
        ));

        allCards = dataArrays.flat();

        if (allCards.length === 0) {
            throw new Error("No cards were loaded from any file.");
        }

        updateStats();
        showCard();
    } catch (e) {
        console.error("Initialization failed:", e);
        document.getElementById('stats').innerText = "Error loading cards. Check console.";
    }
}

function showCard() {
    // Leitner Priority Logic
    let targetCard = null;
    for (let box = 1; box <= 5; box++) {
        const boxCards = allCards.filter(c => (cardStats[c.id] || 1) === box);
        if (boxCards.length > 0) {
            targetCard = boxCards[Math.floor(Math.random() * boxCards.length)];
            break;
        }
    }

    currentCard = targetCard || allCards[Math.floor(Math.random() * allCards.length)];

    // UI Reset
    document.getElementById('card').classList.remove('is-flipped');
    document.getElementById('controls').classList.remove('visible');

    document.getElementById('question').innerText = currentCard.front;
    document.getElementById('answer').innerText = currentCard.back;

    const video = document.getElementById('card-video');
    video.src = currentCard.video || '';
    video.load();
}

function flipCard() {
    document.getElementById('card').classList.add('is-flipped');
    document.getElementById('controls').classList.add('visible');

    const video = document.getElementById('card-video');
    if (video.src) {
        video.play().catch(e => console.log("Autoplay blocked"));
    }
}

function handleAnswer(isCorrect) {
    const id = currentCard.id;
    let box = cardStats[id] || 1;

    if (isCorrect) {
        cardStats[id] = Math.min(box + 1, 5);
    } else {
        cardStats[id] = 1;
    }

    localStorage.setItem('kotodama_stats', JSON.stringify(cardStats));
    updateStats();
    showCard();
}

function updateStats() {
    const totalMastered = Object.values(cardStats).filter(b => b === 5).length;
    document.getElementById('stats').innerText = `Mastered: ${totalMastered} / ${allCards.length}`;
}

init();
