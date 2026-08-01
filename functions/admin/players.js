export async function onRequestGet(context) {
    const { env } = context;
    const list = await env.PLAYERS_KV.list();
    const players = [];

    for (const key of list.keys) {
        const player = await env.PLAYERS_KV.get(key.name, { type: "json" });
        if (player) players.push(player);
    }

    return Response.json(players);
}