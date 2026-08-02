export async function onRequestPost(context) {
    const { env } = context;
    await env.PLAYERS_KV.put("buzz_queue", JSON.stringify([]));
    return Response.json({ cleared: true });
}