import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

const ACKS = [
  "Danke, das hilft mir weiter!",
  "Verstanden, notiere ich mir das!",
  "Gut zu wissen, danke!",
];

const FIRST =
  "Hallo! Ich helfe Ihnen gerne dabei, kabellose Kopfhörer zu finden. Was ist Ihnen dabei am wichtigsten?";
const BUDGET = "Und wie hoch ist Ihr Budget ungefähr?";
const FINAL =
  "Alles klar, vielen Dank! Basierend auf Ihren Angaben empfehle ich Ihnen: RunFit Sport Pro — 69€ — wasserfest und mit sicherem Halt beim Laufen.";

export function ShopBot() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(true);
  const [turn, setTurn] = useState(0);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const lengths = useRef<number[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setMessages([{ from: "bot", text: FIRST }]);
      setTyping(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing || done) return;
    lengths.current.push(text.length);
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const nextTurn = turn + 1;
    setTurn(nextTurn);
    const delay = 1000 + Math.floor(Math.random() * 800);
    setTimeout(() => {
      const ack = ACKS[Math.floor(Math.random() * ACKS.length)]!;
      if (nextTurn === 1) {
        setMessages((m) => [...m, { from: "bot", text: ack }, { from: "bot", text: BUDGET }]);
      } else {
        setMessages((m) => [...m, { from: "bot", text: FINAL }]);
        setDone(true);
      }
      setTyping(false);
    }, delay);
  };

  return (
    <section className="overflow-hidden rounded-xl border-2 border-brand bg-card shadow-lg">
      <div className="flex items-center gap-3 bg-brand px-4 py-3 text-brand-foreground">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-foreground/15 text-lg">
          🤖
        </span>
        <div>
          <p className="text-sm font-bold leading-tight">ShopBot</p>
          <p className="text-[11px] opacity-90">Ihr persönlicher Produktberater</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold">
          <span className="h-2 w-2 rounded-full bg-brand-foreground" /> Online
        </span>
      </div>

      <div ref={scroller} className="max-h-80 space-y-2 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={
                m.from === "user"
                  ? "max-w-[80%] rounded-2xl rounded-br-sm bg-brand px-3.5 py-2 text-sm text-brand-foreground"
                  : "max-w-[80%] rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2 text-sm text-foreground"
              }
            >
              {m.text}
            </p>
          </div>
        ))}
        {typing && (
          <p className="text-xs italic text-muted-foreground">ShopBot schreibt …</p>
        )}
      </div>

      {!done && (
        <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ihre Antwort …"
            aria-label="Nachricht an ShopBot"
            className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand"
          />
          <button
            type="submit"
            className="h-10 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            Senden
          </button>
        </form>
      )}
    </section>
  );
}
