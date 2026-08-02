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
    document.getElementById('buzzButton').disabled = true;
}

setInterval(async () => {
    const res = await fetch('/admin/buzz-status');
    const queue = await res.json();

    const hasBuzzed = queue.find(entry => entry.name.toLowerCase() === playerName.toLowerCase());

    if (!hasBuzzed) {
        document.getElementById('buzzButton').disabled = false;
        document.getElementById('buzzStatus').textContent = '';
    }
}, 2000); // TESTING: 2000ms — change to 500 before the actual quiz

window.buzzerPressed = buzzerPressed;

