async function enterName() {
    const name = document.getElementById("name").value;
    const res = await fetch("/join", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ "name": name, "points": 0 }),
    });
    const data = await res.json();
    console.log(data)
}

window.enterName = enterName;