import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PRODUCTS, type Product } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ElektroPunkt — Kopfhörer & Audio online kaufen" },
      {
        name: "description",
        content:
          "ElektroPunkt: kabellose Kopfhörer, In-Ears und Over-Ears im Überblick. Forschungsprototyp der HAW Hamburg — kein echter Shop.",
      },
      { property: "og:title", content: "ElektroPunkt — Kopfhörer & Audio online kaufen" },
      {
        property: "og:description",
        content:
          "Kabellose Kopfhörer, In-Ears und Over-Ears im Überblick. Forschungsprototyp der HAW Hamburg — kein echter Shop.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ElektroPunkt,
});

type Condition = "a" | "b";

const NAV = ["Handy & Tablet", "Audio", "Computer", "Haushalt", "Angebote"];
const FILLERS = ["Danke, das hilft mir weiter!", "Verstanden, notiere ich mir das!", "Gut zu wissen, danke!"];
const FINAL_MSG =
  "Alles klar, vielen Dank! Basierend auf Ihren Angaben empfehle ich Ihnen: RunFit Sport Pro — 69€ — wasserfest und mit sicherem Halt beim Laufen.";
const OPENING_MSG =
  "Hallo! Ich helfe Ihnen gerne dabei, kabellose Kopfhörer zu finden. Was ist Ihnen dabei am wichtigsten?";
const SECOND_Q = "Und wie hoch ist Ihr Budget ungefähr?";

function ElektroPunkt() {
  const [condition, setCondition] = useState<Condition>("a");
  const [triggered, setTriggered] = useState(false);
  const [query, setQuery] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [priceChoice, setPriceChoice] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  // ?cond=a / ?cond=b support (the dev toggle stays visible for now)
  useEffect(() => {
    const cond = new URLSearchParams(window.location.search).get("cond");
    if (cond === "a" || cond === "b") setCondition(cond);
  }, []);

  // Cosmetic triggers only: nothing here touches the product list.
  const trigger = () => setTriggered(true);

  const reset = (next: Condition) => {
    setCondition(next);
    setTriggered(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Dev-only condition toggle */}
      <div className="flex items-center justify-center gap-2 bg-foreground/90 px-4 py-2 text-xs text-background">
        <span className="opacity-80">Vorschau (nur Entwicklung):</span>
        {(["a", "b"] as Condition[]).map((c) => (
          <button
            key={c}
            onClick={() => reset(c)}
            className={`rounded-md px-2 py-1 font-medium transition-colors ${
              condition === c ? "bg-brand text-brand-foreground" : "bg-background/20 hover:bg-background/30"
            }`}
          >
            {c === "a" ? "Bedingung A — Empfehlungssystem" : "Bedingung B — Chatbot"}
          </button>
        ))}
      </div>

      <header className="bg-brand text-brand-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-foreground" />
            ElektroPunkt
          </div>
          <nav className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {NAV.map((n) => (
              <span key={n} className="cursor-pointer opacity-95 hover:underline">
                {n}
              </span>
            ))}
          </nav>
        </div>
        <div className="bg-brand-dark">
          <div className="mx-auto max-w-6xl px-4 py-1.5 text-xs">
            Kostenloser Versand ab 29€ · Lieferung in 1–2 Werktagen · 30 Tage Rückgaberecht
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5">
        <div className="rounded-lg border border-border border-l-4 border-l-brand bg-card p-4 text-[14px] leading-relaxed shadow-sm">
          <strong>Ihre Aufgabe:</strong> Sie suchen kabellose, wasserfeste Kopfhörer zum Joggen. Ihr Budget
          liegt bei bis zu 80€. Nutzen Sie die Suche und die Filter wie in einem echten Online-Shop.
        </div>

        <div className="mt-5 flex flex-col gap-6 md:flex-row">
          <aside className="w-full shrink-0 md:w-56">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h2 className="text-sm font-semibold">Filter</h2>
              <div className="mt-3 space-y-2">
                {["Kabellos", "Wasserfest", "Noise Cancelling"].map((f) => (
                  <label key={f} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[oklch(0.523_0.208_27.5)]"
                      checked={!!checks[f]}
                      onChange={(e) => {
                        setChecks((p) => ({ ...p, [f]: e.target.checked }));
                        trigger();
                      }}
                    />
                    {f}
                  </label>
                ))}
              </div>

              <h3 className="mt-5 text-sm font-semibold">Preis</h3>
              <div className="mt-2 space-y-2">
                {["bis 50€", "bis 80€", "über 80€"].map((p) => (
                  <label key={p} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="preis"
                      className="h-4 w-4 accent-[oklch(0.523_0.208_27.5)]"
                      checked={priceChoice === p}
                      onChange={() => {
                        setPriceChoice(p);
                        trigger();
                      }}
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                trigger();
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="z. B. kabellose Kopfhörer zum Sport"
                aria-label="Suche"
                className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-brand"
              />
              <button
                type="submit"
                className="h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
              >
                Suchen
              </button>
            </form>

            {condition === "a" && triggered && (
              <div className="mt-4 rounded-lg border border-brand/30 bg-brand/5 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
                  Empfohlen für Sie
                </span>
                <p className="mt-1 text-sm">
                  Basierend auf Ihrer Suche empfehlen wir: RunFit Sport Pro — 69€, wasserfest &amp;
                  kabellos, optimal für Lauftraining.
                </p>
              </div>
            )}

            <h1 className="mt-5 text-lg font-semibold">Kopfhörer &amp; Kabellose Ohrhörer</h1>
            <p className="text-xs text-muted-foreground">{PRODUCTS.length} Artikel</p>

            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-3">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="group flex flex-col rounded-lg border border-border bg-card p-3 text-left transition-shadow hover:shadow-md"
                >
                  <img
                    src={p.image}
                    alt={`${p.name} Produktfoto`}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                  <span className="mt-2 text-sm font-semibold leading-snug">{p.name}</span>
                  <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{p.teaser}</span>
                  <span className="mt-2 text-base font-bold text-brand">{p.price}€</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-8 border-t border-border py-6">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground">
          Prototyp für Forschungszwecke — kein echter Shop. HAW Hamburg, Masterarbeit Vertrauen &amp;
          algorithmische Systeme.
        </p>
      </footer>

      {condition === "b" && triggered && <ShopBot />}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/50 p-4"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-3xl rounded-xl bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            aria-label="Schließen"
            className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-5 sm:flex-row">
          <img
            src={product.image}
            alt={`${product.name} Produktfoto groß`}
            width={768}
            height={768}
            className="aspect-square w-full rounded-lg object-cover sm:w-72"
          />
          <div className="min-w-0 flex-1">
            <p className="text-2xl font-bold text-brand">{product.price}€</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <dl className="mt-4 divide-y divide-border border-t border-border text-sm">
              {[
                ["Typ", product.typ],
                ["Akkulaufzeit", product.akku],
                ["Schutzklasse", product.schutz],
                ["Gewicht", product.gewicht],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <button className="mt-4 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90">
              In den Warenkorb
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Msg = { from: "bot" | "user"; text: string };

/**
 * Fixed 3-turn script. The bot is turn-counted only — it never reads or reacts
 * to what the participant actually types.
 */
function ShopBot() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(true);
  const [turn, setTurn] = useState(0);
  const [done, setDone] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setTyping(false);
      setMessages([{ from: "bot", text: OPENING_MSG }]);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing || done) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const nextTurn = turn + 1;
    setTurn(nextTurn);
    const delay = 1000 + Math.random() * 800;
    setTimeout(() => {
      setTyping(false);
      if (nextTurn === 1) {
        const filler = FILLERS[Math.floor(Math.random() * FILLERS.length)];
        setMessages((m) => [...m, { from: "bot", text: `${filler} ${SECOND_Q}` }]);
      } else {
        setMessages((m) => [...m, { from: "bot", text: FINAL_MSG }]);
        setDone(true);
      }
    }, delay);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex max-h-[80vh] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
      <div className="flex items-center gap-2 bg-brand px-4 py-3 text-brand-foreground">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-foreground/20 text-sm">
          🤖
        </span>
        <span className="text-sm font-semibold">ShopBot</span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
              m.from === "bot"
                ? "bg-muted text-foreground"
                : "ml-auto bg-brand text-brand-foreground"
            }`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm italic text-muted-foreground">
            ShopBot schreibt …
          </div>
        )}
      </div>

      {done ? (
        <div className="border-t border-border p-3">
          <button className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90">
            Weiter
          </button>
        </div>
      ) : (
        <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nachricht eingeben…"
            aria-label="Nachricht eingeben"
            className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand"
          />
          <button
            type="submit"
            className="h-9 rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            Senden
          </button>
        </form>
      )}
    </div>
  );
}
