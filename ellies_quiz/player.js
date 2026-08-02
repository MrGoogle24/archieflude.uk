function getPlayerNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name");
}

const playerName = getPlayerNameFromURL();
document.getElementById("hello").innerHTML = `Welcome, ${playerName}`;

async function loadPlayerStatus() {
    const res = await fetch(`/player-status?name=${encodeURIComponent(playerName)}`);
    const data = await res.json();

    document.getElementById("points").innerHTML = data.player.points;

    if (!data.hasBuzzed) {
        document.getElementById('buzzButton').disabled = false;
        document.getElementById("buzzButton").textContent = 'BUZZ IN!!!!';
    }
}

loadPlayerStatus();
setInterval(loadPlayerStatus, 750); // TESTING: change to 500 before the actual quiz

async function buzzerPressed() {
    const res = await fetch('/buzz', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: playerName })
    })

    const player = await res.json();

    document.getElementById("buzzButton").textContent = "BUZZED IN!!!!";
    document.getElementById('buzzButton').disabled = true;
}

window.buzzerPressed = buzzerPressed;