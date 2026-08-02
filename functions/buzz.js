export async function onRequestPost(context) {
    const { request, env } = context;
    const { name } = await request.json();

    let queue = await env.PLAYERS_KV.get("buzz_queue", { type: "json" }) || [];

    if (!queue.find(entry => entry.name.toLowerCase() === name.toLowerCase())) {
        queue.push({ name, time: Date.now() });
        await env.PLAYERS_KV.put("buzz_queue", JSON.stringify(queue));
    }

    return Response.json(queue);
}