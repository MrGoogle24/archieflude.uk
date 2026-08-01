export async function onRequestPost(context) {
    const { request, env } = context;
    const { name } = await request.json();
    const key = name.toLowerCase();

    const player = await env.PLAYERS_KV.get(key, { type: "json" });
    if (!player) {
        return new Response(JSON.stringify({ error: "Player Not Found" }), { status: 404 });
    }

    if (!player.buzzedAt) {
        player.buzzedAt = Date.now();
        await env.PLAYERS_KV.put(key, JSON.stringify(player));
    }

    return Response.json(player)
}