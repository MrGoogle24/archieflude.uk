export async function onRequestGet(context) {
    const { env } = context;
    const queue = await env.PLAYERS_KV.get("buzz_queue", { type: "json" }) || [];

    const sorted = queue.slice().sort((a, b) => a.time - b.time);

    return Response.json(sorted);
}