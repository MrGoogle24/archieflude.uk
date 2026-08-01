async function enterName() {
    const name = document.getElementById("name").value;
    const res = await fetch("/join", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ "name": name, "points": 0 }),
    });
    const data = await res.json();

    window.location.href = `player.html?name=${encodeURIComponent(data.name)}`;

    console.log(data)
}

window.enterName = enterName;