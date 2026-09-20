import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

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
  const scroller = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
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
        add.push({ from: "bot", text: FINAL });
        setDone(true);
      }
      setMessages((m) => [...m, ...add]);
      setTyping(false);
    }, delay);
  };

  return (
    <section className="flex min-h-[70vh] flex-col overflow-hidden rounded-xl border-2 border-brand bg-card shadow-lg md:min-h-[78vh]">
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

      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
        {messages.map((m, i) => (
          <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={
                m.from === "user"
                  ? "max-w-[75%] rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-sm text-brand-foreground"
                  : "max-w-[75%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm text-foreground"
              }
            >
              {m.text}
            </p>
          </div>
        ))}
        {typing && <p className="text-xs italic text-muted-foreground">ShopBot schreibt …</p>}
      </div>

      {!done && (
        <div className="flex gap-2 border-t border-border p-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ihre Antwort …"
            aria-label="Nachricht an ShopBot"
            className="h-12 min-w-0 flex-1 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-brand"
          />
          <button
            type="button"
            onClick={send}
            className="h-12 rounded-lg bg-brand px-7 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            Senden
          </button>
        </div>
      )}
    </section>
  );
}
