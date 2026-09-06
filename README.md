# ElektroPunkt Research Study

PROJECT: "ElektroPunkt" — a fictional German electronics e-commerce store, 

built as a research prototype for a university master's thesis study on 

consumer trust in recommendation systems vs. AI chatbots. This is NOT a 

real store — it's a controlled research instrument. Read all constraints 

carefully; some of them exist specifically to keep the experiment valid, 

not for visual polish.

## VISUAL STYLE

- Brand: "ElektroPunkt" — a plausible, generic German electronics retailer 

  vibe (think: big-box electronics store), but a completely original brand, 

  not a copy of any real company's logo or exact layout.

- Color palette: primary red #C8102E, dark red #96031f (used for a slim 

  sub-banner under the header), off-white background #f7f7f5, near-black 

  text #1a1a1a, neutral gray for secondary text #6b6b6b, light border gray 

  #e2e2e2.

- Header: red bar with the wordmark "ElektroPunkt" (with a small bullet/dot 

  accent before the name) on the left, a horizontal nav with category links 

  on the right (Handy & Tablet, Audio, Computer, Haushalt, Angebote — these 

  are decorative, non-functional). Below it, a slim darker-red bar with a 

  one-line shipping message.

- Overall feel: clean, modern, slightly dense (like a real electronics 

  retailer), rounded corners (6–10px), subtle hover shadows on product 

  cards, system sans-serif font.

## PAGE LAYOUT (single page)

1. Header (as above)

2. A "task banner" box (white card, red left border, 14px text) with fixed 

   German copy: "Ihre Aufgabe: Sie suchen kabellose, wasserfeste Kopfhörer 

   zum Joggen. Ihr Budget liegt bei bis zu 80€. Nutzen Sie die Suche und 

   die Filter wie in einem echten Online-Shop."

3. Two-column layout below: a left sidebar with filters, and a main content 

   area with a search bar and the product grid.

4. Footer with small gray disclaimer text: "Prototyp für Forschungszwecke — 

   kein echter Shop. HAW Hamburg, Masterarbeit Vertrauen & algorithmische 

   Systeme."

## SIDEBAR FILTERS (cosmetic — see CRITICAL RULE below)

- Checkboxes: "Kabellos", "Wasserfest", "Noise Cancelling"

- Radio buttons under "Preis": "bis 50€", "bis 80€", "über 80€"

## SEARCH BAR

- Text input with placeholder "z. B. kabellose Kopfhörer zum Sport" + a 

  red "Suchen" button.

## PRODUCTS — IMPORTANT

- Generate at least 24 distinct headphone/earbud products (mix of in-ear 

  and over-ear), each with: a product name (invented, generic-sounding 

  brand names like "RunFit Sport Pro", "AudioMax Air", "ClearTone Studio", 

  "BassLine Grip", "PulseAudio Mini", "SoundWave Clip" — invent more in 

  this style), a price between 39€ and 120€, and a short one-line 

  description.

- PRODUCT IMAGES MUST BE REAL PHOTOGRAPHIC-STYLE PRODUCT PHOTOS, NOT ICONS 

  OR ILLUSTRATIONS. Source or generate realistic-looking product photography 

  (clean white/light studio background, like real e-commerce photos).

- CRITICAL: no product may show any real, recognizable brand name or logo 

  (no JBL, Sony, Apple, Bose, Beats, etc., anywhere in the image or text). 

  All products must look like generic, unbranded "no-name" merchandise — 

  this is a scientific requirement, not a style preference, because real 

  brand recognition would bias the study's trust measurements.

- Clicking any product card opens a modal/detail panel with: a larger 

  version of the same photo, the name, price, a 2–3 sentence description, 

  and a small spec list (Typ: In-Ear/Over-Ear, Akkulaufzeit, Schutzklasse, 

  Gewicht — invent plausible values per product).

## CRITICAL RULE — STANDARDIZATION (do not skip this)

This is a controlled experiment. The search bar and filters must FEEL fully 

functional (user can type anything, check any filter) but must NEVER 

actually change, hide, reorder, or filter the product grid. Every visitor, 

regardless of what they type or click, must see the exact same 24+ products 

in the exact same order, and — in Condition A — the exact same final 

recommended product. This is intentional: the study measures reactions to 

a fixed stimulus, not real search results.

## TWO CONDITIONS (controlled by a URL parameter ?cond=a or ?cond=b — 

for now during development, add a small toggle at the top so I can preview 

both; I will remove it or replace it with the URL parameter logic later)

### Condition A — "Empfehlungssystem"

After the user searches or applies any filter, show a highlighted banner 

above the grid: "Empfohlen für Sie" (small red uppercase tag) + text: 

"Basierend auf Ihrer Suche empfehlen wir: RunFit Sport Pro — 69€, 

wasserfest & kabellos, optimal für Lauftraining." No chat, no dialogue — 

purely a static banner.

### Condition B — "Chatbot"

After the user searches, a chat widget opens (bottom-right or inline card) 

labeled "ShopBot" with a robot icon. It runs this EXACT fixed 3-turn 

script — the bot logic must be turn-counted only, and must NEVER read, 

parse, or react to the actual text content the user types:

1. Bot opens (after an 800ms "ShopBot schreibt …" typing indicator): 

   "Hallo! Ich helfe Ihnen gerne dabei, kabellose Kopfhörer zu finden. 

   Was ist Ihnen dabei am wichtigsten?"

2. A free-text input appears ("Nachricht eingeben…" + "Senden" button). 

   User types anything (any non-empty text is accepted — do not validate 

   or judge content, just require length > 0).

3. After sending, show "ShopBot schreibt …" for a RANDOM delay between 

   1000–1800ms, then reply with ONE randomly chosen phrase from this list: 

   ["Danke, das hilft mir weiter!", "Verstanden, notiere ich mir das!", 

   "Gut zu wissen, danke!"] immediately followed by the fixed question: 

   "Und wie hoch ist Ihr Budget ungefähr?"

4. User types anything again in the same free-text input.

5. After sending, show the typing indicator again (same random delay), 

   then send the FINAL fixed message (identical product/price to Condition 

   A): "Alles klar, vielen Dank! Basierend auf Ihren Angaben empfehle ich 

   Ihnen: RunFit Sport Pro — 69€ — wasserfest und mit sicherem Halt beim 

   Laufen."

6. After this final message, hide the text input and send button, and 

   reveal a "Weiter" button.

## TECHNICAL CONSTRAINTS

- No real backend, no real AI/LLM API calls anywhere — this is a fully 

  scripted front-end state machine (turn counter + setTimeout delays only).

- No real search/filter logic — inputs are cosmetic triggers only, as 

  described above.

- Everything in one responsive page, usable both as a standalone URL and 

  embeddable in an iframe.

- All user-facing text must be in German, exactly as specified above 

  where exact wording is given.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3ddbb3d7-96a8-4517-ac01-10c0319f9539).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
