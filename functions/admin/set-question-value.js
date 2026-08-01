export async function onRequestPost(context) {
    const { request, env } = context;
    const { value } = await request.json();
    await env.PLAYERS_KV.put("current_question_value", JSON.stringify(value));
    return Response.json({ value });
}