import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/products";

type Msg = { from: "bot" | "user"; text: string; products?: boolean };

const RECOMMENDED_IDS = [1, 13, 15, 10];
const RECOMMENDED = RECOMMENDED_IDS.flatMap((id) => {
  const product = PRODUCTS.find((item) => item.id === id);
  return product ? [product] : [];
});

const ACKS = [
  "Danke, das hilft mir weiter!",
  "Verstanden, notiere ich mir das!",
  "Gut zu wissen, danke!",
];

const FINAL =
  "Alles klar, vielen Dank! Basierend auf Ihren Angaben empfehle ich Ihnen: RunFit Sport Pro — 69€ — wasserfest und mit sicherem Halt beim Laufen.";

type Topic = {
  id: string;
  question: string;
  /** Wenn eines dieser Wörter bereits genannt wurde, wird die Frage übersprungen. */
  keywords: string[];
  /** Kurze Bestätigung, wenn das Thema schon erwähnt wurde. */
  echo: (hit: string) => string;
};

const TOPICS: Topic[] = [
  {
    id: "einsatz",
    question: "Wofür möchten Sie die Kopfhörer hauptsächlich nutzen — Sport, Pendeln oder zu Hause?",
    keywords: [
      "sport", "laufen", "joggen", "fitness", "training", "gym", "pendeln", "bahn", "zug",
      "büro", "buero", "arbeit", "zuhause", "zu hause", "reisen", "gaming",
    ],
    echo: (hit) => `Sie nutzen die Kopfhörer also vor allem für „${hit}“ — das notiere ich mir.`,
  },
  {
    id: "bauform",
    question: "Bevorzugen Sie In-Ear-Stöpsel oder Over-Ear-Kopfhörer?",
    keywords: ["in-ear", "in ear", "stöpsel", "stoepsel", "over-ear", "over ear", "bügel", "buegel", "on-ear", "ohrhörer", "ohrhoerer"],
    echo: (hit) => `Bauform „${hit}“ habe ich mir notiert.`,
  },
  {
    id: "farbe",
    question: "Haben Sie eine Farbpräferenz?",
    keywords: ["schwarz", "weiß", "weiss", "grau", "blau", "rot", "grün", "gruen", "silber", "beige", "rosa", "pink", "farbe"],
    echo: (hit) => `Farbe „${hit}“ — verstanden.`,
  },
  {
    id: "features",
    question: "Sind Ihnen Noise Cancelling oder eine lange Akkulaufzeit wichtig?",
    keywords: ["noise", "anc", "geräuschunterdrückung", "akku", "laufzeit", "batterie", "wasserfest", "spritzwasser", "bluetooth", "kabellos"],
    echo: (hit) => `„${hit}“ ist Ihnen wichtig — gut zu wissen.`,
  },
  {
    id: "budget",
    question: "Und wie hoch ist Ihr Budget ungefähr?",
    keywords: ["€", "eur", "euro", "budget", "günstig", "guenstig", "billig", "preis"],
    echo: (hit) => `Beim Preis orientiere ich mich an „${hit}“.`,
  },
];

function findHit(text: string, keywords: string[]): string | null {
  const t = text.toLowerCase();
  for (const k of keywords) if (t.includes(k)) return k;
  return null;
}

export function ShopBot({ query = "" }: { query?: string }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(true);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const covered = useRef<Set<string>>(new Set());
  const pending = useRef<Topic | null>(null);
  const lengths = useRef<number[]>([]);

  // Was bereits in der Suchanfrage steckt, gilt als beantwortet.
  const greet = () => {
    const pre: string[] = [];
    for (const t of TOPICS) {
      const hit = findHit(query, t.keywords);
      if (hit) {
        covered.current.add(t.id);
        pre.push(t.echo(hit));
      }
    }
    const next = TOPICS.find((t) => !covered.current.has(t.id)) ?? null;
    pending.current = next;
    const first: Msg[] = [
      {
        from: "bot",
        text: "Hallo! Ich helfe Ihnen gerne dabei, die passenden Kopfhörer zu finden.",
      },
    ];
    if (pre.length) first.push({ from: "bot", text: pre.join(" ") });
    first.push({
      from: "bot",
      text: next ? next.question : "Was ist Ihnen dabei am wichtigsten?",
    });
    setMessages(first);
    setTyping(false);
  };

  useEffect(() => {
    const t = setTimeout(greet, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = (value: string) => {
    const text = value.trim();
    if (!text || typing || done) return;
    lengths.current.push(text.length);
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    // aktuelle Frage gilt als beantwortet
    if (pending.current) covered.current.add(pending.current.id);
    // alles, was der Nutzer nebenbei erwähnt, ebenfalls abhaken
    const echoes: string[] = [];
    for (const t of TOPICS) {
      if (covered.current.has(t.id)) continue;
      const hit = findHit(text, t.keywords);
      if (hit) {
        covered.current.add(t.id);
        echoes.push(t.echo(hit));
      }
    }
    const next = TOPICS.find((t) => !covered.current.has(t.id)) ?? null;
    pending.current = next;

    const delay = 1000 + Math.floor(Math.random() * 800);
    setTimeout(() => {
      const ack = ACKS[Math.floor(Math.random() * ACKS.length)]!;
      const add: Msg[] = [{ from: "bot", text: ack }];
      if (echoes.length) add.push({ from: "bot", text: echoes.join(" ") });
      if (next) {
        add.push({ from: "bot", text: next.question });
      } else {
        add.push({ from: "bot", text: FINAL, products: true });
        setDone(true);
      }
      setMessages((m) => [...m, ...add]);
      setTyping(false);
    }, delay);
  };

  return (
    <section className="flex h-[72vh] min-h-[550px] flex-col overflow-hidden rounded-lg border-2 border-brand bg-card shadow-lg md:h-[78vh]">
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
          {messages.map((m, i) => (
            <Message key={i} from={m.from === "user" ? "user" : "assistant"} className={m.products ? "max-w-full" : "max-w-[85%]"}>
              <MessageContent className={m.from === "user" ? "bg-brand text-brand-foreground dark:bg-brand dark:text-brand-foreground" : "bg-transparent text-foreground"}>
                <MessageResponse>{m.text}</MessageResponse>
                {m.products && (
                  <div className="mt-4 w-full">
                    <p className="mb-3 text-sm font-semibold">Passende Kopfhörer</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {RECOMMENDED.map((product, index) => (
                        <div key={product.id} className="flex min-w-0 flex-col rounded-md border border-border bg-card p-3">
                          <Link to="/produkt/$id" params={{ id: String(product.id) }} className="group/product flex flex-1 flex-col">
                            <img src={product.image} alt={`${product.name} Produktfoto`} className="aspect-square w-full rounded-sm object-cover" loading="lazy" />
                            <span className="mt-2 text-xs font-semibold text-brand">{index === 0 ? "Unsere Empfehlung" : "Ähnliches Modell"}</span>
                            <span className="mt-1 text-sm font-semibold group-hover/product:underline">{product.name}</span>
                            <span className="mt-1 text-sm font-bold text-brand">{product.price}€</span>
                          </Link>
                          <Button asChild variant="outline" size="sm" className="mt-3 w-full text-brand">
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
          ))}
          {typing && <p className="text-xs italic text-muted-foreground" role="status">ShopBot schreibt …</p>}
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
              <PromptInputSubmit aria-label="Senden" title="Senden" status={typing ? "submitted" : "ready"} disabled={typing || !input.trim()} className="bg-brand text-brand-foreground" />
            </PromptInputFooter>
          </PromptInput>
        </div>
      )}
    </section>
  );
}
