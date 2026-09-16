import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Header, Footer } from "@/components/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ElektroPunkt — Elektronik, Technik & Angebote online" },
      {
        name: "description",
        content:
          "ElektroPunkt Online-Shop: Kopfhörer, TV, Laptops, Haushalt und Smart Home zu Aktionspreisen. Versandkostenfrei ab 29€.",
      },
      { property: "og:title", content: "ElektroPunkt — Elektronik, Technik & Angebote online" },
      {
        property: "og:description",
        content: "Kopfhörer, TV, Laptops, Haushalt und Smart Home zu Aktionspreisen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const CATEGORIES: { label: string; icon: string; slug?: string }[] = [
  { label: "Kopfhörer", icon: "🎧" },
  { label: "Lautsprecher", icon: "🔊", slug: "lautsprecher" },
  { label: "Smartwatches", icon: "⌚", slug: "smartwatches" },
  { label: "Laptops", icon: "💻", slug: "laptops" },
  { label: "Smart Home", icon: "🏠", slug: "smart-home" },
  { label: "Gaming", icon: "🎮", slug: "gaming" },
];

const DEALS = [
  { tag: "-30%", title: "TV-Wochen", copy: "Große Bildschirme, kleine Preise. Nur bis Sonntag." },
  { tag: "0%", title: "Finanzierung", copy: "24 Monate ohne Zinsen ab 199€ Bestellwert." },
  { tag: "NEU", title: "Smart Home Sets", copy: "Licht, Heizung und Sicherheit im Paket." },
];

const STRIPS = [
  { icon: "🚚", t: "Kostenloser Versand", s: "ab 29€ Bestellwert" },
  { icon: "↩️", t: "30 Tage Rückgabe", s: "kostenlos zurücksenden" },
  { icon: "🏬", t: "Abholung im Markt", s: "in über 200 Filialen" },
  { icon: "🔒", t: "Sichere Zahlung", s: "SSL-verschlüsselt" },
];

function Home() {
  const navigate = useNavigate();
  const rawSearch = useRouterState({ select: (st) => st.location.search as Record<string, unknown> });
  const condition = rawSearch['cond'] === "b" ? "b" : "a";
  const [query, setQuery] = useState("");

  const go = (q: string) =>
    navigate({ to: "/suche", search: { q: q.trim() || "Kopfhörer", cond: condition } });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <div className="bg-foreground py-2 text-center text-xs font-semibold uppercase tracking-wider text-background">
        Rote Wochen · bis zu 40% auf ausgewählte Technik
      </div>

      <main>
        {/* Search hero */}
        <section className="bg-gradient-to-b from-brand/10 to-transparent px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Technik finden. Sofort.
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Über 120.000 Artikel — sagen Sie uns einfach, wonach Sie suchen.
            </p>
            <form
              className="mx-auto mt-6 flex max-w-2xl gap-2 rounded-xl bg-card p-2 shadow-lg ring-2 ring-brand/40"
              onSubmit={(e) => {
                e.preventDefault();
                go(query);
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Wonach suchen Sie?"
                aria-label="Suche"
                autoFocus
                className="h-12 min-w-0 flex-1 rounded-lg bg-transparent px-3 text-base outline-none"
              />
              <button
                type="submit"
                className="h-12 rounded-lg bg-brand px-7 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
              >
                Suchen
              </button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              Beliebt gerade:{" "}
              {["Kopfhörer", "Saugroboter", "Fernseher", "Kaffeevollautomat"].map((s, i) => (
                <span key={s}>
                  {i > 0 && " · "}
                  <button onClick={() => go(s)} className="underline hover:text-brand">
                    {s}
                  </button>
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {CATEGORIES.map((c) =>
              c.slug ? (
                <Link
                  key={c.label}
                  to="/kategorie/$slug"
                  params={{ slug: c.slug }}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-shadow hover:shadow-md"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-xs font-semibold">{c.label}</span>
                </Link>
              ) : (
                <button
                  key={c.label}
                  onClick={() => go(c.label)}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-shadow hover:shadow-md"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-xs font-semibold">{c.label}</span>
                </button>
              ),
            )}
          </div>
        </section>

        {/* Big promo tiles */}
        <section className="mx-auto mt-8 max-w-6xl px-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-brand p-6 text-brand-foreground md:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-90">
                Aktion der Woche
              </span>
              <h2 className="mt-2 text-2xl font-bold">Audio-Tage: Kopfhörer stark reduziert</h2>
              <p className="mt-1 text-sm opacity-95">
                In-Ear, Over-Ear und Sportmodelle — hunderte Angebote, solange der Vorrat reicht.
              </p>
              <button
                onClick={() => go("Kopfhörer")}
                className="mt-4 rounded-lg bg-brand-foreground px-5 py-2 text-sm font-semibold text-brand"
              >
                Angebote ansehen
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <span className="rounded-md bg-brand px-2 py-1 text-[11px] font-bold text-brand-foreground">
                CLUB
              </span>
              <h2 className="mt-3 text-lg font-bold">5€ Gutschein sichern</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Kostenlos anmelden und bei jeder Bestellung sparen.
              </p>
              <button className="mt-4 w-full rounded-lg border border-brand py-2 text-sm font-semibold text-brand">
                Jetzt Mitglied werden
              </button>
            </div>
          </div>
        </section>

        {/* Deal strip */}
        <section className="mx-auto mt-3 max-w-6xl px-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {DEALS.map((d) => (
              <div key={d.title} className="rounded-lg border border-border bg-card p-4">
                <span className="inline-block rounded-md bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand">
                  {d.tag}
                </span>
                <h3 className="mt-2 text-sm font-semibold">{d.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{d.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service strip */}
        <section className="mx-auto mt-8 max-w-6xl px-4">
          <div className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-4">
            {STRIPS.map((s) => (
              <div key={s.t} className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <p className="text-xs font-semibold">{s.t}</p>
                  <p className="text-xs text-muted-foreground">{s.s}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {condition === "b" && (
        <button
          onClick={() => go("Kopfhörer")}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-xl transition-transform hover:scale-105"
        >
          <span className="text-lg">🤖</span> Mit ShopBot chatten
        </button>
      )}

      <Footer />
    </div>
  );
}
