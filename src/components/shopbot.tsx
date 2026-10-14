import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/products";
import { reportSearchToParent } from "@/lib/parent-search";

type Msg = { from: "bot" | "user"; text: string; products?: boolean };

const RECOMMENDED_IDS = [1, 13, 15, 10];
const RECOMMENDED = RECOMMENDED_IDS.flatMap((id) => {
  const product = PRODUCTS.find((item) => item.id === id);
  return product ? [product] : [];
});

const GREETING = "Hallo! 👋 Wie kann ich Ihnen heute helfen? Wonach suchen Sie?";
const ERROR_TEXT =
  "Entschuldigung, da ist etwas schiefgelaufen. Bitte versuchen Sie es noch einmal.";

export function ShopBot({ query = "" }: { query?: string }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(true);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const lengths = useRef<number[]>([]);
  const busy = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim()) reportSearchToParent(query);
      setMessages([{ from: "bot", text: GREETING }]);
      setTyping(false);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = async (value: string) => {
    const text = value.trim();
    if (!text || typing || done || busy.current) return;
    busy.current = true;
    lengths.current.push(text.length);
    reportSearchToParent(text);
    const history: Msg[] = [...messages, { from: "user", text }];
    setMessages([...history, { from: "bot", text: "" }]);
    setInput("");
    setTyping(true);

    const setBotText = (t: string, products = false) =>
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { from: "bot", text: t, ...(products ? { products: true } : {}) };
        return copy;
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const final = res.headers.get("X-ShopBot-Final") === "1";
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done: end, value: chunk } = await reader.read();
        if (end) break;
        acc += decoder.decode(chunk, { stream: true });
        setBotText(acc);
      }
      if (!acc.trim()) throw new Error("empty");
      if (final) {
        setBotText(acc, true);
        setDone(true);
      }
    } catch {
      setBotText(ERROR_TEXT);
    } finally {
      busy.current = false;
      setTyping(false);
    }
  };

  return (
    <section className="mx-auto flex h-[620px] max-h-[85vh] w-full max-w-[620px] flex-col overflow-hidden rounded-lg border-2 border-brand bg-card shadow-lg">
      <div className="flex items-center gap-3 bg-brand px-5 py-4 text-brand-foreground">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-foreground/15 text-2xl">
          🤖
        </span>
        <div>
          <p className="text-base font-bold leading-tight">ShopBot</p>
          <p className="text-xs opacity-90">Ihr persönlicher Produktberater</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-brand-foreground" /> Online
        </span>
      </div>

      <Conversation className="min-h-0">
        <ConversationContent className="gap-3 px-5 py-5">
          {messages.map((m, i) =>
            m.text === "" ? null : (
              <Message
                key={i}
                from={m.from === "user" ? "user" : "assistant"}
                className={m.products ? "max-w-full" : "max-w-[85%]"}
              >
                <MessageContent
                  className={
                    m.from === "user"
                      ? "bg-brand text-brand-foreground dark:bg-brand dark:text-brand-foreground"
                      : "bg-transparent text-foreground"
                  }
                >
                  <MessageResponse>{m.text}</MessageResponse>
                  {m.products && (
                    <div className="mt-4 w-full">
                      <p className="mb-3 text-sm font-semibold">Passende Kopfhörer</p>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {RECOMMENDED.map((product, index) => (
                          <div
                            key={product.id}
                            className="flex min-w-0 flex-col rounded-md border border-border bg-card p-3"
                          >
                            <Link
                              to="/produkt/$id"
                              params={{ id: String(product.id) }}
                              className="group/product flex flex-1 flex-col"
                            >
                              <img
                                src={product.image}
                                alt={`${product.name} Produktfoto`}
                                className="aspect-square w-full rounded-sm object-cover"
                                loading="lazy"
                              />
                              <span className="mt-2 text-xs font-semibold text-brand">
                                {index === 0 ? "Unsere Empfehlung" : "Ähnliches Modell"}
                              </span>
                              <span className="mt-1 text-sm font-semibold group-hover/product:underline">
                                {product.name}
                              </span>
                              <span className="mt-1 text-sm font-bold text-brand">
                                {product.price}€
                              </span>
                            </Link>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="mt-3 w-full text-brand"
                            >
                              <Link to="/produkt/$id" params={{ id: String(product.id) }}>
                                Zum Produkt <ArrowRight aria-hidden="true" />
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </MessageContent>
              </Message>
            ),
          )}
          {typing && (
            <p className="text-xs italic text-muted-foreground" role="status">
              ShopBot schreibt …
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton aria-label="Zu den neuesten Nachrichten" />
      </Conversation>

      {!done && (
        <div className="border-t border-border p-4">
          <PromptInput onSubmit={({ text }) => send(text)}>
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ihre Antwort …"
              aria-label="Nachricht an ShopBot"
              className="min-h-12"
              disabled={typing}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                aria-label="Senden"
                title="Senden"
                status={typing ? "submitted" : "ready"}
                disabled={typing || !input.trim()}
                className="bg-brand text-brand-foreground"
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      )}
    </section>
  );
}
