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

// test
addPoints("Archie", 1);