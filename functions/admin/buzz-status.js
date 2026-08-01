export async function onRequestGet(context) {
    const { env } = context;

    const list = await env.PLAYERS_KV.list();
    const players = []

    for (const key of list.keys) {
        const player = await env.PLAYERS_KV.get(key.name, { type: "json" });
        if (player) players.push(player);
    }

    const buzzed = players
        .filter(player => player.buzzedAt)
        .sort((a, b) => a.buzzedAt - b.buzzedAt);

    return Response.json(buzzed)
}