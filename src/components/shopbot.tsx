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
/** German input made comparable: umlauts written out, everything else to spaces. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const rxCache = new Map<string, RegExp>();
/** Word-aware keyword test. A trailing "*" also accepts word endings (lauf* → läuft, laufen). */
const has = (s: string, words: string[]) => {
  for (const w of words) {
    let re = rxCache.get(w);
    if (!re) {
      const stem = w.endsWith("*");
      const base = (stem ? w.slice(0, -1) : w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      re = new RegExp(stem ? `\\b${base}\\w*` : `\\b${base}\\b`);
      rxCache.set(w, re);
    }
    if (re.test(s)) return true;
  }
  return false;
};

const WORD_NUMBERS: [string, string][] = [
  ["einhundert", "100"],
  ["hundert", "100"],
  ["neunzig", "90"],
  ["achtzig", "80"],
  ["siebzig", "70"],
  ["sechzig", "60"],
  ["fuenfzig", "50"],
  ["vierzig", "40"],
  ["dreissig", "30"],
  ["zwanzig", "20"],
];

const budgetOf = (s: string) => {
  const expanded = WORD_NUMBERS.reduce(
    (acc, [word, digits]) => acc.replace(new RegExp(`\\b${word}\\b`), digits),
    s,
  );
  for (const raw of expanded.match(/\d{1,4}/g) ?? []) {
    const value = Number(raw);
    if (value >= 10 && value <= 5000) return `Budget bis ca. ${value}€`;
  }
  if (
    has(s, [
      "guenstig*",
      "gunstig*",
      "billig*",
      "preiswert*",
      "sparsam*",
      "nicht so teuer",
      "nicht viel geld",
      "kleines budget",
      "budget egal",
      "preis leistungs*",
    ])
  )
    return "Budget notiert";
  return null;
};

const TOPICS: { key: TopicKey; question: string; match: (s: string) => string | null }[] = [
  {
    key: "need",
    question: "Wonach suchen Sie genau?",
    match: (s) =>
      has(s, [
        "kopfh*",
        "kophorer",
        "kophrer",
        "headphone*",
        "headset*",
        "earbud*",
        "buds",
        "ohrhrer",
        "oehrer",
        "hoerer",
        "ohrstoepsel*",
        "stoepsel*",
        "musik",
        "audio*",
        "hoer*",
      ])
        ? "Sie suchen Kopfhörer"
        : null,
  },
  {
    key: "use",
    question: "Wofür möchten Sie die Kopfhörer hauptsächlich nutzen – Sport, Pendeln oder zu Hause?",
    match: (s) => {
      if (
        has(s, [
          "sport*",
          "laufen",
          "lauft",
          "laeuft",
          "laeufer*",
          "jog*",
          "run",
          "running",
          "training",
          "trainier*",
          "gym*",
          "fitness",
          "workout",
          "rad",
          "fahrrad",
          "cycling",
          "bike",
          "marathon",
          "schwimm*",
          "swim*",
          "wandern",
          "yoga",
          "cardio",
          "aerobic",
          "hiking",
          "home trainer",
        ])
      )
        return "für den Sport";
      if (
        has(s, [
          "pendel*",
          "bahn*",
          "zug*",
          "zueg*",
          "strassenbahn",
          "tram",
          "bus",
          "reise*",
          "urlaub",
          "unterwegs",
          "draussen",
          "auto",
          "flug*",
          "fliegen",
          "flughafen",
          "umsteigen",
        ])
      )
        return "für unterwegs";
      if (
        has(s, [
          "zu hause",
          "zuhause",
          "daheim",
          "home",
          "wohnzimmer",
          "buero",
          "buro",
          "office",
          "arbeit*",
          "lernen",
          "konzentration",
          "pc",
          "gaming",
          "zock*",
          "konsole",
          "fernsehen",
          "tv",
          "film*",
          "serie*",
          "streaming",
          "podcast*",
          "hoerbuch*",
          "schlafen",
          "entspannung",
          "meditation",
          "kinder*",
          "kind",
          "tochter",
          "sohn",
          "schule",
        ])
      )
        return "für zu Hause";
      return null;
    },
  },
  {
    key: "form",
    question: "Bevorzugen Sie In-Ear oder Over-Ear?",
    match: (s) => {
      if (
        has(s, [
          "in ear*",
          "inear*",
          "earbud*",
          "buds",
          "ohrstoepsel*",
          "stoepsel*",
          "im ohr",
          "kompakt*",
        ])
      )
        return "In-Ear";
      if (
        has(s, [
          "over ear*",
          "overear*",
          "on ear*",
          "onear*",
          "buegel*",
          "kopfbuegel*",
          "ueber dem ohr",
          "ums ohr",
          "gross*",
          "kapsel*",
        ])
      )
        return "Over-Ear";
      return null;
    },
  },
  {
    key: "budget",
    question: "Wie hoch ist Ihr Budget ungefähr?",
    match: budgetOf,
  },
];

/** Details the bot acknowledges without asking about them. */
const EXTRAS: { label: string; words: string[] }[] = [
  {
    label: "wasserfest",
    words: [
      "wasserfest*",
      "wasserdicht*",
      "wasser dich*",
      "schwimm*",
      "swim*",
      "pool",
      "schweiss*",
      "schwitz*",
      "regen",
      "dusch*",
      "ipx",
      "ip 6*",
      "ip 7*",
      "ip 8*",
    ],
  },
  {
    label: "Noise Cancelling",
    words: [
      "noise cancelling",
      "noisecancelling",
      "geraeusch*",
      "gerausch*",
      "anc",
      "abschirm*",
      "ruhe",
      "ruhig",
    ],
  },
  {
    label: "lange Akkulaufzeit",
    words: ["akku*", "laufzeit", "laden*", "ladestation", "stunden", "tagelang", "kapazitaet*"],
  },
  {
    label: "kabellos",
    words: ["bluetooth", "kabellos", "wireless", "ohne kabel", "kein kabel", "ohne stecker"],
  },
  { label: "mit Kabel", words: ["aux", "3 5", "jack*", "klinke", "mit kabel"] },
  {
    label: "gutes Mikrofon",
    words: [
      "mikrofon*",
      "mic",
      "headset*",
      "telefon*",
      "anrufe",
      "gespraeche",
      "call*",
      "zoom",
      "skype",
      "konferenz",
      "meetings",
    ],
  },
  {
    label: "bequemer Sitz",
    words: [
      "bequem*",
      "komfort*",
      "leicht*",
      "sitz*",
      "kleine ohren",
      "druck*",
      "lang tragen",
      "nicht drueckt",
    ],
  },
  {
    label: "satter Klang",
    words: ["bass*", "sound*", "klang*", "hi fi", "hifi", "qualitaet*", "hochwertig*", "premium"],
  },
  {
    label: "schonend für die Ohren",
    words: [
      "gehoer*",
      "lautstaerke*",
      "sensibel*",
      "empfindlich*",
      "ohrenschmerzen",
      "tinnitus",
      "ohren belast*",
    ],
  },
  {
    label: "Farbe notiert",
    words: [
      "schwarz*",
      "weiss*",
      "grau*",
      "blau*",
      "rot*",
      "gruen*",
      "gelb*",
      "silber*",
      "rosa",
      "pink",
      "orange",
      "lila",
    ],
  },
];

/** Answers like "egal" close the open question without adding new information. */
const DONT_CARE = [
  "egal",
  "ist mir egal",
  "keine praeferenz*",
  "keine praferenz*",
  "weiss nicht",
  "weiss ich nicht",
  "keine ahnung",
  "kein plan",
  "was du willst",
  "wie du magst",
  "beides",
  "jedes",
  "alle",
  "hauptsache gut",
  "ist mir recht",
  "schon recht",
  "passt schon",
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
      if (query.trim()) {
        reportSearchToParent(query);
        const q = norm(query);
        for (const t of TOPICS) if (t.match(q)) covered.current.add(t.key);
        for (const e of EXTRAS) if (has(q, e.words)) seenExtras.current.add(e.label);
      }
      setMessages([{ from: "bot", text: GREETING }]);
      setTyping(false);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const covered = useRef<Set<TopicKey>>(new Set());
  const seenExtras = useRef<Set<string>>(new Set());

  const send = (value: string) => {
    const text = value.trim();
    if (!text || typing || done || busy.current) return;
    busy.current = true;
    lengths.current.push(text.length);
    reportSearchToParent(text);
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    const lower = norm(text);
    const topicEchoes: string[] = [];
    for (const t of TOPICS) {
      if (covered.current.has(t.key)) continue;
      const hit = t.match(lower);
      if (hit) {
        covered.current.add(t.key);
        topicEchoes.push(hit);
      }
    }
    const extraEchoes: string[] = [];
    for (const e of EXTRAS) {
      if (seenExtras.current.has(e.label)) continue;
      if (has(lower, e.words)) {
        seenExtras.current.add(e.label);
        extraEchoes.push(e.label);
      }
    }
    // A reply that names nothing new still answers the open question.
    const pending = TOPICS.find((t) => !covered.current.has(t.key));
    const shrugged = !topicEchoes.length && has(lower, DONT_CARE);
    if (pending && (shrugged || (!topicEchoes.length && pendingAsked.current === pending.key))) {
      covered.current.add(pending.key);
    }
    if ((topicEchoes.length || extraEchoes.length) && !covered.current.has("need")) {
      covered.current.add("need");
    }
    const next = TOPICS.find((t) => !covered.current.has(t.key));
    const echoes = [...topicEchoes, ...extraEchoes].slice(0, 4);
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
