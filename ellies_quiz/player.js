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

