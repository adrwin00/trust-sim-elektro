import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const MODEL = "openai/gpt-6-astra";
export const FINAL_TURN = 3;

type ChatMsg = { role: "user" | "assistant"; content: string };

const BASE = `Du bist "ShopBot", der freundliche Produktberater des deutschen Elektronik-Onlineshops ElektroPunkt. Du hilfst Kunden, passende Kopfhörer zu finden.
Regeln:
- Antworte immer auf Deutsch, per "Sie", in höchstens 2 kurzen Sätzen.
- Gehe konkret auf das ein, was der Kunde zuletzt geschrieben hat (kurze, natürliche Bestätigung).
- Stelle niemals eine Frage zu Informationen, die der Kunde schon genannt hat.
- Nenne keine Markennamen und erfinde keine Produkte, außer der vorgegebenen Empfehlung.
- Keine Listen, keine Überschriften, kein Markdown.
- Wenn der Kunde etwas Themenfremdes schreibt, antworte kurz freundlich und führe zurück zur Kopfhörer-Suche.`;

function stageInstruction(userTurns: number) {
  if (userTurns >= FINAL_TURN) {
    return `${BASE}
Jetzt ist die Beratung abgeschlossen. Bedanke dich kurz, nimm Bezug auf die Angaben des Kunden und empfehle genau dieses Produkt: "RunFit Sport Pro — 69€" (wasserfest, sicherer Halt beim Laufen). Schreibe den Produktnamen exakt so. Stelle keine Frage mehr.`;
  }
  if (userTurns === 1) {
    return `${BASE}
Stelle jetzt genau EINE kurze Rückfrage zum Einsatzzweck (z. B. Sport, Pendeln, zu Hause) oder – falls der Zweck schon genannt wurde – zur Bauform (In-Ear oder Over-Ear). Empfiehl noch kein Produkt.`;
  }
  return `${BASE}
Stelle jetzt genau EINE kurze Rückfrage nach dem ungefähren Budget – es sei denn, der Kunde hat sein Budget schon genannt; dann frage nach noch fehlenden Details zu Einsatzzweck oder Bauform. Empfiehl noch kein Produkt.`;
}

export async function handleShopBotChat(request: Request): Promise<Response> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) return Response.json({ error: "Chat ist nicht konfiguriert." }, { status: 500 });

  let body: { messages?: unknown };
  try {
    body = (await request.json()) as { messages?: unknown };
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMsg[] = raw.slice(-12).flatMap((m: unknown) => {
    const r = m as { role?: unknown; content?: unknown };
    if ((r.role !== "user" && r.role !== "assistant") || typeof r.content !== "string") return [];
    return [{ role: r.role, content: r.content.slice(0, 500) } as ChatMsg];
  });
  const userTurns = messages.filter((m) => m.role === "user").length;
  if (userTurns === 0 || messages[messages.length - 1]?.role !== "user") {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey: key,
    headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: stageInstruction(userTurns),
    messages,
    abortSignal: request.signal,
    providerOptions: {
      openai: { store: false, forceReasoning: true, reasoningEffort: "low" },
    },
  });
  return result.toTextStreamResponse({
    headers: {
      "Cache-Control": "no-cache, no-transform",
      "X-ShopBot-Final": userTurns >= FINAL_TURN ? "1" : "0",
    },
  });
}
