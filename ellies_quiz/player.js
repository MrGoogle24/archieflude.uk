function getPlayerNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name");
}

const playerName = getPlayerNameFromURL();
document.getElementById("hello").innerHTML = `Welcome, ${playerName}`;

async function loadPlayerData() {
    const res = await fetch(`/player-data?name=${encodeURIComponent(playerName)}`);
    const player = await res.json();
    document.getElementById("points").innerHTML = player.points;
}


loadPlayerData();

async function buzzerPressed() {
    const res = await fetch('/buzz', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: playerName })
    })

    const player = await res.json();

    document.getElementById('buzzStatus').textContent = "BUZZED IN!!!!";
    document.getElementById('buzzPlayer').disabled = true;
}

window.buzzerPressed = buzzerPressed;

setInterval(async () => {
    const res = await fetch(`/player-data?name=${encodeURIComponent(playerName)}`);
    const player = await res.json();

    if (!player.buzzedAt) {
        document.getElementById('buzzButton').disabled = false;
        document.getElementById('buzzStatus').textContent = '';
    }
}, 100);

