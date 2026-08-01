export async function onRequestPost(context) {
    const {request, env} = context;
    const { name } = await request.json();
    const key = name.toLowerCase();

    let player = await env.PLAYERS_KV.get(key, { type: "json" });

    if (!player) {
        player = { "name": name, "points": 0, "buzzedAt": null };
        await env.PLAYERS_KV.put(key, JSON.stringify(player));
    }

    return Response.json(player)
}