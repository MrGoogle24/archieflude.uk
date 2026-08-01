export async function onRequestGet(context) {
    const { request,env } = context;
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    if (!name) {
        return new Response(JSON.stringify({ error: "No name provided"}), { status: 400 });
    }

    const key = name.toLowerCase()
    const player = await env.PLAYERS_KV.get(key, { type: "json" });

    if (!player) {
        return new Response(JSON.stringify({ error: "Player not found" }), { status: 404 });
    }

    return Response.json(player);
}