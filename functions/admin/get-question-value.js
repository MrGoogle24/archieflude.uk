export async function onRequestGet(context) {
    const { env } = context;
    const value = await env.PLAYERS_KV.get("current_question_value", { type: "json" });
    return Response.json({ value: value ?? 0 });
}