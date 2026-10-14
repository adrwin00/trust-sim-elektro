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
type TopicKey = "need" | "use" | "form" | "budget";
const has = (s: string, words: string[]) => words.find((w) => s.includes(w));
const TOPICS: { key: TopicKey; question: string; match: (s: string) => string | null }[] = [
  {
    key: "need",
    question: "Wonach suchen Sie genau?",
    match: (s) =>
      has(s, ["kopfhörer", "kopfhoerer", "headphone", "earbuds", "ohrhörer", "headset", "kopfh"])
        ? "Sie suchen Kopfhörer"
        : null,
  },
  {
    key: "use",
    question: "Wofür möchten Sie die Kopfhörer hauptsächlich nutzen – Sport, Pendeln oder zu Hause?",
    match: (s) => {
      if (has(s, ["sport", "lauf", "joggen", "training", "gym", "fitness", "run"])) return "für den Sport";
      if (has(s, ["pendel", "bahn", "zug", "reise", "unterwegs", "bus"])) return "für unterwegs";
      if (has(s, ["zu hause", "zuhause", "home", "büro", "office", "arbeit"])) return "für zu Hause";
      return null;
    },
  },
  {
    key: "form",
    question: "Bevorzugen Sie In-Ear oder Over-Ear?",
    match: (s) => {
      if (has(s, ["in-ear", "in ear", "inear", "earbuds", "ohrstöpsel"])) return "In-Ear";
      if (has(s, ["over-ear", "over ear", "overear", "on-ear", "bügel"])) return "Over-Ear";
      return null;
    },
  },
  {
    key: "budget",
    question: "Wie hoch ist Ihr Budget ungefähr?",
    match: (s) => {
      const m = s.match(/(\d{2,4})\s*(€|euro|eur)?/);
      if (m) return `Budget bis ca. ${m[1]}€`;
      if (has(s, ["günstig", "billig", "egal", "preiswert"])) return "Budget notiert";
      return null;
    },
  },
];
const ACKS = ["Danke!", "Verstanden.", "Super, danke.", "Alles klar."];
const FINAL_TEXT =
  "Basierend auf Ihren Angaben empfehle ich Ihnen die **RunFit Sport Pro — 69€**: wasserfest, sicherer Sitz und lange Akkulaufzeit. Hier sind auch ein paar ähnliche Modelle:";

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

  const covered = useRef<Set<TopicKey>>(new Set());

  const send = (value: string) => {
    const text = value.trim();
    if (!text || typing || done || busy.current) return;
    busy.current = true;
    lengths.current.push(text.length);
    reportSearchToParent(text);
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    const lower = text.toLowerCase();
    const echoes: string[] = [];
    for (const t of TOPICS) {
      if (covered.current.has(t.key)) continue;
      const hit = t.match(lower);
      if (hit) {
        covered.current.add(t.key);
        echoes.push(hit);
      }
    }
    // A reply that matches nothing answers the pending question.
    const pending = TOPICS.find((t) => !covered.current.has(t.key));
    if (!echoes.length && pending && pendingAsked.current === pending.key) {
      covered.current.add(pending.key);
    }
    const next = TOPICS.find((t) => !covered.current.has(t.key));
    const ack = echoes.length
      ? `Alles klar – ${echoes.join(", ")}. `
      : ACKS[Math.floor(Math.random() * ACKS.length)] + " ";

    setTimeout(
      () => {
        if (next) {
          pendingAsked.current = next.key;
          setMessages((m) => [...m, { from: "bot", text: ack + next.question }]);
        } else {
          setMessages((m) => [...m, { from: "bot", text: ack + FINAL_TEXT, products: true }]);
          setDone(true);
        }
        busy.current = false;
        setTyping(false);
      },
      1000 + Math.random() * 800,
    );
  };
  const pendingAsked = useRef<TopicKey | null>("need");

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
