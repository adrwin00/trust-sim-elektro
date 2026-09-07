import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { Header, Footer, Stars, useCart } from "@/components/shop";
import { ratingFor, reviewsFor, discountFor } from "@/lib/catalog";

type Search = { q?: string };

export const Route = createFileRoute("/suche")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search['q'] === "string" ? search['q'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kopfhörer & Kabellose Ohrhörer — ElektroPunkt" },
      {
        name: "description",
        content:
          "Kopfhörer, In-Ears und Over-Ears bei ElektroPunkt: Bewertungen, Preise und Aktionsangebote im Überblick.",
      },
      { property: "og:title", content: "Kopfhörer & Kabellose Ohrhörer — ElektroPunkt" },
      {
        property: "og:description",
        content: "Kopfhörer, In-Ears und Over-Ears bei ElektroPunkt im Überblick.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Results,
});

const SORTS = [
  "Beliebtheit",
  "Preis aufsteigend",
  "Preis absteigend",
  "Bewertung",
];

function Results() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const { add } = useCart();
  const [query, setQuery] = useState(q ?? "");
  const [sort, setSort] = useState(SORTS[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(q ?? "");
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-5">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/suche", search: { q: query.trim() || "Kopfhörer" } });
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Wonach suchen Sie?"
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

        <nav className="mt-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">
            Start
          </Link>{" "}
          &gt; Audio &gt; <span className="text-foreground">Kopfhörer</span>
        </nav>

        <div className="mt-4 rounded-lg border border-brand/30 bg-brand/5 p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
            Empfohlen für Sie
          </span>
          <p className="mt-1 text-sm">
            Basierend auf Ihrer Suche empfehlen wir: RunFit Sport Pro — 69€, wasserfest &amp;
            kabellos, optimal für Lauftraining.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">Kopfhörer &amp; Kabellose Ohrhörer</h1>
            <p className="text-xs text-muted-foreground">62 Ergebnisse</p>
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            Sortieren nach:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 rounded-lg border border-border bg-card px-2 text-sm text-foreground outline-none focus:border-brand"
            >
              {SORTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-muted-foreground">Ergebnisse werden geladen …</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {PRODUCTS.map((p) => {
              const disc = discountFor(p.id);
              return (
                <div
                  key={p.id}
                  className="flex flex-col rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-md"
                >
                  <Link
                    to="/produkt/$id"
                    params={{ id: String(p.id) }}
                    className="flex flex-col"
                  >
                    <div className="relative">
                      <img
                        src={p.image}
                        alt={`${p.name} Produktfoto`}
                        loading="lazy"
                        width={768}
                        height={768}
                        className="aspect-square w-full rounded-md object-cover"
                      />
                      {disc && (
                        <span className="absolute left-1 top-1 rounded-md bg-brand px-1.5 py-0.5 text-[11px] font-bold text-brand-foreground">
                          -{disc}%
                        </span>
                      )}
                    </div>
                    <span className="mt-2 text-sm font-semibold leading-snug">{p.name}</span>
                    <Stars rating={ratingFor(p.id)} reviews={reviewsFor(p.id)} />
                    <span className="mt-2 flex items-baseline gap-2">
                      <span className="text-base font-bold text-brand">{p.price}€</span>
                      {disc && (
                        <span className="text-xs text-muted-foreground line-through">
                          {Math.round(p.price / (1 - disc / 100))}€
                        </span>
                      )}
                    </span>
                  </Link>
                  <button
                    onClick={add}
                    className="mt-2 rounded-lg bg-brand py-2 text-xs font-semibold text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    In den Warenkorb
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
