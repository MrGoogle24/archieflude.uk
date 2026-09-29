let allCards = [];
let currentCard = null;
let currentCategory = 'all';
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
    // Filter pool based on category
    const filteredCards = currentCategory === 'all'
        ? allCards
        : allCards.filter(c => c.type === currentCategory);

    if (filteredCards.length === 0) {
        document.getElementById('question').innerText = "No cards available!";
        document.getElementById('answer').innerText = "";
        return;
    }

    // Leitner Priority Logic
    let targetCard = null;
    for (let box = 1; box <= 5; box++) {
        const boxCards = filteredCards.filter(c => (cardStats[c.id] || 1) === box);
        if (boxCards.length > 0) {
            targetCard = boxCards[Math.floor(Math.random() * boxCards.length)];
            break;
        }
    }

    currentCard = targetCard || filteredCards[Math.floor(Math.random() * filteredCards.length)];

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

    // First, flip the card back to the front so the transition is hidden
    document.getElementById('card').classList.remove('is-flipped');
    document.getElementById('controls').classList.remove('visible');

    // Then, wait for the flip animation to complete before loading the next card
    setTimeout(() => {
        showCard();
    }, 300);
}

function setCategory(cat) {
    currentCategory = cat;

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === cat);
    });

    updateStats();
    showCard();
}

function updateStats() {
    const filteredCards = currentCategory === 'all'
        ? allCards
        : allCards.filter(c => c.type === currentCategory);

    const totalMastered = filteredCards.filter(c => cardStats[c.id] === 5).length;
    document.getElementById('stats').innerText = `Mastered: ${totalMastered} / ${filteredCards.length}`;
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        const card = document.getElementById('card');
        if (!card.classList.contains('is-flipped')) {
            flipCard();
        }
    } else if (e.key === 'a') {
        const controls = document.getElementById('controls');
        if (controls.classList.contains('visible')) {
            handleAnswer(false);
        }
    } else if (e.key === 'd') {
        const controls = document.getElementById('controls');
        if (controls.classList.contains('visible')) {
            handleAnswer(true);
        }
    }
});

init();
