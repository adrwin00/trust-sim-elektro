import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Stars, useCart } from "@/components/shop";
import { categoryBySlug } from "@/data/categories";
import { ratingFor, reviewsFor, discountFor } from "@/lib/catalog";

export const Route = createFileRoute("/kategorie/$slug")({
  head: ({ params }) => {
    const cat = categoryBySlug(params.slug);
    const title = cat ? `${cat.title} — ElektroPunkt` : "Kategorie — ElektroPunkt";
    const description = cat
      ? `${cat.intro} Jetzt bei ElektroPunkt online bestellen.`
      : "Produktkategorien bei ElektroPunkt.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = categoryBySlug(slug);
  const { add } = useCart();

  if (!cat) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-xl font-semibold">Diese Kategorie ist derzeit nicht verfügbar.</h1>
          <Link to="/" className="mt-3 inline-block text-sm text-brand hover:underline">
            Zurück zur Startseite
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-5">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">
            Start
          </Link>{" "}
          {cat.parent !== "Start" && <>&gt; {cat.parent} </>}
          &gt; <span className="text-foreground">{cat.title}</span>
        </nav>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-brand/5 p-5">
          <span className="text-3xl">{cat.icon}</span>
          <div>
            <h1 className="text-xl font-bold">{cat.title}</h1>
            <p className="text-sm text-muted-foreground">{cat.intro}</p>
          </div>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          {cat.products.length * 9 + 7} Ergebnisse
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {cat.products.map((p, i) => {
            const id = i + 1 + slug.length * 3;
            const disc = discountFor(id);
            return (
              <div
                key={p.name}
                className="flex flex-col rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-md"
              >
                <div className="relative">
                  <img
                    src={catImage(slug, i)}
                    alt={`${p.name} Produktfoto`}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="aspect-square w-full rounded-md bg-muted object-cover"
                  />
                  {disc && (
                    <span className="absolute left-1 top-1 rounded-md bg-brand px-1.5 py-0.5 text-[11px] font-bold text-brand-foreground">
                      -{disc}%
                    </span>
                  )}
                </div>

                <span className="mt-2 text-sm font-semibold leading-snug">{p.name}</span>
                <Stars rating={ratingFor(id)} reviews={reviewsFor(id)} />
                <span className="mt-2 flex items-baseline gap-2">
                  <span className="text-base font-bold text-brand">{p.price}€</span>
                  {disc && (
                    <span className="text-xs text-muted-foreground line-through">
                      {Math.round(p.price / (1 - disc / 100))}€
                    </span>
                  )}
                </span>
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
      </main>

      <Footer />
    </div>
  );
}
