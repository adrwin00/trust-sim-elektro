import { Link } from "@tanstack/react-router";
import { createContext, useContext, useState, type ReactNode } from "react";

const NAV = [
  { label: "Handy & Tablet", slug: "handy-tablet" },
  { label: "Audio", slug: "audio" },
  { label: "Computer", slug: "computer" },
  { label: "Haushalt", slug: "haushalt" },
  { label: "Angebote", slug: "angebote" },
];

type CartCtx = { count: number; add: () => void };
const Cart = createContext<CartCtx>({ count: 0, add: () => {} });

export function useCart() {
  return useContext(Cart);
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState(false);

  const add = () => {
    setCount((c) => c + 1);
    setToast(true);
    window.setTimeout(() => setToast(false), 1800);
  };

  return (
    <Cart.Provider value={{ count, add }}>
      {children}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lg">
          Zum Warenkorb hinzugefügt
        </div>
      )}
    </Cart.Provider>
  );
}

export function Header({ decorative = false }: { decorative?: boolean }) {
  const { count } = useCart();
  return (
    <header className="bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-foreground" />
          ElektroPunkt
        </Link>
        <nav className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          {NAV.map((n) =>
            decorative ? (
              <span key={n.slug} className="opacity-95">
                {n.label}
              </span>
            ) : (
              <Link
                key={n.slug}
                to="/kategorie/$slug"
                params={{ slug: n.slug }}
                className="cursor-pointer opacity-95 hover:underline"
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-4">
          <span className="relative text-lg" aria-label="Warenkorb">
            🛒
            <span className="absolute -right-2.5 -top-1.5 min-w-[18px] rounded-full bg-brand-foreground px-1 text-center text-[11px] font-bold leading-[18px] text-brand">
              {count}
            </span>
          </span>
          <span className="text-lg" aria-label="Konto">
            👤
          </span>
        </div>
      </div>
      <div className="bg-brand-dark">
        <div className="mx-auto max-w-6xl px-4 py-1.5 text-xs">
          Kostenloser Versand ab 29€ · Lieferung in 1–2 Werktagen · 30 Tage Rückgaberecht
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-sm font-semibold">Kontakt</h3>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Service-Hotline: 040 555 12 30</li>
            <li>service@elektropunkt.de</li>
            <li>Mo–Sa 8–20 Uhr</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Rechtliches</h3>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {["Impressum", "AGB", "Datenschutz", "Widerrufsrecht"].map((l) => (
              <li key={l} className="cursor-pointer hover:underline">
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Zahlungsarten</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {["VISA", "Mastercard", "PayPal", "Klarna"].map((p) => (
              <span
                key={p}
                className="rounded-md border border-border px-2 py-1 text-[10px] font-bold tracking-wide text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Newsletter</h3>
          <p className="mt-2 text-xs text-muted-foreground">Angebote jede Woche per E-Mail.</p>
          <div className="mt-2 flex gap-2">
            <input
              placeholder="E-Mail-Adresse"
              aria-label="E-Mail-Adresse"
              className="h-9 min-w-0 flex-1 rounded-md border border-border bg-background px-2 text-xs outline-none focus:border-brand"
            />
            <button type="button" className="h-9 rounded-md bg-brand px-3 text-xs font-semibold text-brand-foreground">
              Anmelden
            </button>
          </div>
        </div>
      </div>
      <p className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2026 ElektroPunkt GmbH
      </p>
    </footer>
  );
}

export function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
      <span className="font-semibold text-foreground">{rating.toFixed(1)} ★</span>
      <span>({reviews} Bewertungen)</span>
    </span>
  );
}
