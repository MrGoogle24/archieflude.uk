export async function onRequestPost(context) {
    const { request, env } = context;
    const { name, amount } = await request.json();
    const key = name.toLowerCase();

    const player = await env.PLAYERS_KV.get(key, { type: "json" });
    if (!player) {
        return new Response(JSON.stringify({ error: "Player not found"}), { status: 404 });
    }

    player.points += amount;

    await env.PLAYERS_KV.put(key, JSON.stringify(player));

    return Response.json(player);
}