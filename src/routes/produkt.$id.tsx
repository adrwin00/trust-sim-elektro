import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { Header, Footer, Stars, useCart } from "@/components/shop";
import { ratingFor, reviewsFor, discountFor } from "@/lib/catalog";

export const Route = createFileRoute("/produkt/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => String(p.id) === params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Produkt"} — ElektroPunkt` },
      { name: "description", content: loaderData?.teaser ?? "Produktdetails bei ElektroPunkt." },
      { property: "og:title", content: `${loaderData?.name ?? "Produkt"} — ElektroPunkt` },
      { property: "og:description", content: loaderData?.teaser ?? "Produktdetails bei ElektroPunkt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Detail,
});

function Detail() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const disc = discountFor(product.id);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-5">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">
            Start
          </Link>{" "}
          &gt;{" "}
          <Link to="/suche" search={{ q: "Kopfhörer" }} className="hover:underline">
            Kopfhörer
          </Link>{" "}
          &gt; <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-5 flex flex-col gap-8 md:flex-row">
          <img
            src={product.image}
            alt={`${product.name} Produktfoto groß`}
            width={768}
            height={768}
            className="aspect-square w-full rounded-xl border border-border bg-card object-cover md:w-[420px]"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <Stars rating={ratingFor(product.id)} reviews={reviewsFor(product.id)} />
            <p className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-brand">{product.price}€</span>
              {disc && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {Math.round(product.price / (1 - disc / 100))}€
                  </span>
                  <span className="rounded-md bg-brand px-2 py-0.5 text-xs font-bold text-brand-foreground">
                    -{disc}%
                  </span>
                </>
              )}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <dl className="mt-5 divide-y divide-border border-t border-border text-sm">
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

            <button
              onClick={add}
              className="mt-5 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 sm:w-64"
            >
              In den Warenkorb
            </button>

            <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
              <li>✓ Kostenlose Rücksendung innerhalb 30 Tagen</li>
              <li>✓ Sichere Zahlung</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
