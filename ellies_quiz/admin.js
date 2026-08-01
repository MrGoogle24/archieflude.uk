let playerName;

async function getPlayerByName(name) {
    const res = await fetch('/admin/players');
    const players = await res.json();
    return players.find(p => p.name.toLowerCase() === name.toLowerCase());
}

async function addPoints(name, amount) {
    const res = await fetch('/admin/add-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, amount })
    });

    const updatedPlayer = await res.json();
    console.log('Updated: ', updatedPlayer);
    return updatedPlayer;
}

async function loadBuzzStatus() {
    const res = await fetch('/admin/buzz-status');
    const buzzed = await res.json();

    const list = document.getElementById("buzzList")
    list.innerHTML = "";

    buzzed.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.points} points)`;
        list.appendChild(li);
    });
}

async function clearBuzzer() {
    await fetch('/admin/clear-buzzer', {method: 'POST'});
    loadBuzzStatus();
}

async function awardWinner() {
    const buzzRes = await fetch('/admin/buzz-status');
    const buzzed = await buzzRes.json();

    if (buzzed.length === 0) {
        alert('No one has buzzed in yet!');
        return;
    }

    const winner = buzzed[0]; // fastest buzzer

    const valueRes = await fetch('/admin/get-question-value');
    const { value } = await valueRes.json();

    const addRes = await fetch('/admin/add-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: winner.name, amount: value })
    });

    const updatedPlayer = await addRes.json();
    console.log(`Awarded ${value} points to:`, updatedPlayer);
}

window.awardWinner = awardWinner;

window.clearBuzzer = clearBuzzer;

setInterval(loadBuzzStatus, 100);

loadBuzzStatus();
