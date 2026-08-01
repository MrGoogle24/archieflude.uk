export async function onRequestPost(context) {
    const { env } = context;

    const list = await env.PLAYERS_KV.list();

    for (const key of list.keys) {
        const player = await env.PLAYERS_KV.get(key.name, { type: "json" });
        if (player && player.buzzedAt) {
            player.buzzedAt = null;
            await env.PLAYERS_KV.put(key.name, JSON.stringify(player));
        }
    }

    return Response.json({ cleared: true });
}