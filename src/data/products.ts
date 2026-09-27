import p1 from "@/assets/products/p1.jpg";
import p2 from "@/assets/products/p2.jpg";
import p3 from "@/assets/products/p3.jpg";
import p4 from "@/assets/products/p4.jpg";
import p5 from "@/assets/products/p5.jpg";
import p6 from "@/assets/products/p6.jpg";
import p7 from "@/assets/products/p7.jpg";
import p8 from "@/assets/products/p8.jpg";
import p9 from "@/assets/products/p9.jpg";
import p10 from "@/assets/products/p10.jpg";
import p11 from "@/assets/products/p11.jpg";
import p12 from "@/assets/products/p12.jpg";

export type Product = {
  id: number;
  name: string;
  price: number;
  teaser: string;
  description: string;
  image: string;
  typ: "In-Ear" | "Over-Ear" | "On-Ear";
  akku: string;
  schutz: string;
  gewicht: string;
};

/**
 * Fixed product list. Order is constant for every visitor — the search bar and
 * the filters never modify this array (controlled research stimulus).
 */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "RunFit Sport Pro",
    price: 69,
    teaser: "Kabellose In-Ears mit sicherem Halt beim Laufen.",
    description:
      "Die RunFit Sport Pro wurden für intensives Lauftraining entwickelt und sitzen dank flexibler Ohrbügel auch bei schnellen Bewegungen sicher. Der wasserfeste Aufbau schützt zuverlässig vor Schweiß und Regen. Über die Ladeschale kommen Sie auf insgesamt rund 28 Stunden Musikwiedergabe.",
    image: p1,
    typ: "In-Ear",
    akku: "8 Std. (28 Std. mit Ladeschale)",
    schutz: "IPX7",
    gewicht: "5,1 g pro Ohrhörer",
  },
  {
    id: 2,
    name: "AudioMax Air",
    price: 89,
    teaser: "Leichte Over-Ears mit weichen Memory-Foam-Polstern.",
    description:
      "Die AudioMax Air setzen auf einen betont leichten Bügel und weiche Memory-Foam-Polster für lange Hörsessions. Der Klang ist ausgewogen abgestimmt, mit klaren Höhen und kontrolliertem Bass. Per Kabel lassen sich die Kopfhörer auch ohne Akku nutzen.",
    image: p2,
    typ: "Over-Ear",
    akku: "34 Std.",
    schutz: "IPX2",
    gewicht: "218 g",
  },
  {
    id: 3,
    name: "PulseAudio Mini",
    price: 49,
    teaser: "Kompakte In-Ears für den Alltag und kurze Wege.",
    description:
      "Die PulseAudio Mini sind besonders klein gebaut und verschwinden fast vollständig im Ohr. Trotz der kompakten Bauform liefern sie einen kräftigen Bass. Die Ladeschale passt in jede Hosentasche.",
    image: p3,
    typ: "In-Ear",
    akku: "6 Std. (22 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,3 g pro Ohrhörer",
  },
  {
    id: 4,
    name: "ClearTone Studio",
    price: 119,
    teaser: "Over-Ears mit aktiver Geräuschunterdrückung.",
    description:
      "Die ClearTone Studio filtern Umgebungsgeräusche mit einer zweistufigen aktiven Geräuschunterdrückung heraus. Ein Transparenzmodus lässt Stimmen bei Bedarf wieder durch. Die Ohrmuscheln lassen sich flach drehen und platzsparend verstauen.",
    image: p4,
    typ: "Over-Ear",
    akku: "40 Std.",
    schutz: "IPX2",
    gewicht: "254 g",
  },
  {
    id: 5,
    name: "SoftBeat Nova",
    price: 59,
    teaser: "Kabellose Ohrhörer mit warmer Klangabstimmung.",
    description:
      "Die SoftBeat Nova sind auf eine warme, angenehme Klangabstimmung ausgelegt und eignen sich gut für Podcasts und Hörbücher. Die matte Oberfläche fühlt sich griffig an. Vier Aufsatzgrößen liegen bei.",
    image: p5,
    typ: "In-Ear",
    akku: "7 Std. (25 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,8 g pro Ohrhörer",
  },
  {
    id: 6,
    name: "BassLine Grip",
    price: 74,
    teaser: "Sportkopfhörer mit rutschfestem Bügel.",
    description:
      "Der gummierte Bügel der BassLine Grip liegt eng am Kopf an und verrutscht auch beim Training nicht. Der Bass ist bewusst kräftig abgestimmt. Eine Schnellladung von zehn Minuten reicht für rund zwei Stunden Wiedergabe.",
    image: p6,
    typ: "On-Ear",
    akku: "24 Std.",
    schutz: "IPX5",
    gewicht: "176 g",
  },
  {
    id: 7,
    name: "UrbanSound Dock",
    price: 65,
    teaser: "In-Ears mit robuster Ladeschale für unterwegs.",
    description:
      "Die UrbanSound Dock kommen mit einer besonders stabilen Ladeschale, die auch in der Tasche einiges aushält. Die Bedienung erfolgt über Berührungsflächen an beiden Ohrhörern. Eine Einzelnutzung eines Ohrhörers ist möglich.",
    image: p7,
    typ: "In-Ear",
    akku: "6 Std. (30 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "5,4 g pro Ohrhörer",
  },
  {
    id: 8,
    name: "RedLine Beat 300",
    price: 99,
    teaser: "Auffällige Over-Ears mit kräftigem Bass.",
    description:
      "Die RedLine Beat 300 setzen auf große 40-mm-Treiber und eine basslastige Abstimmung. Der Bügel ist mehrstufig verstellbar und gepolstert. Ein Mikrofonarm ist nicht nötig — Telefonate laufen über zwei integrierte Mikrofone.",
    image: p8,
    typ: "Over-Ear",
    akku: "30 Std.",
    schutz: "IPX2",
    gewicht: "262 g",
  },
  {
    id: 9,
    name: "AirFlow Green Edition",
    price: 55,
    teaser: "Leichte Ohrhörer in matter Farboberfläche.",
    description:
      "Die AirFlow Green Edition wiegen kaum spürbare fünf Gramm pro Seite und eignen sich für lange Tage im Ohr. Die halboffene Bauform verhindert Druckgefühl. Umgebungsgeräusche bleiben dabei hörbar.",
    image: p9,
    typ: "In-Ear",
    akku: "5 Std. (20 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "5,0 g pro Ohrhörer",
  },
  {
    id: 10,
    name: "SoundWave Clip",
    price: 79,
    teaser: "Offene Clip-Ohrhörer ohne Druck im Gehörgang.",
    description:
      "Die SoundWave Clip werden außen an der Ohrmuschel befestigt und verschließen den Gehörgang nicht. Dadurch bleiben Verkehr und Umgebung hörbar — praktisch beim Laufen im Freien. Der Klang bleibt trotz offener Bauweise klar.",
    image: p10,
    typ: "In-Ear",
    akku: "9 Std. (26 Std. mit Ladeschale)",
    schutz: "IPX5",
    gewicht: "6,2 g pro Ohrhörer",
  },
  {
    id: 11,
    name: "DeepBlue Studio One",
    price: 109,
    teaser: "Studiokopfhörer mit neutraler Abstimmung.",
    description:
      "Die DeepBlue Studio One zielen auf eine möglichst neutrale Wiedergabe und eignen sich für Aufnahme und Schnitt. Die Ohrpolster sind austauschbar. Ein Spiralkabel liegt für den kabelgebundenen Betrieb bei.",
    image: p11,
    typ: "Over-Ear",
    akku: "36 Std.",
    schutz: "IPX2",
    gewicht: "279 g",
  },
  {
    id: 12,
    name: "TrailRun Open",
    price: 84,
    teaser: "Offener Sportkopfhörer für Läufe im Freien.",
    description:
      "Der TrailRun Open sitzt vor statt im Ohr und lässt Umgebungsgeräusche bewusst durch. Der Nackenbügel bleibt auch bei ruppigen Trails stabil. Schweiß und Regen machen dem Gehäuse nichts aus.",
    image: p12,
    typ: "On-Ear",
    akku: "10 Std.",
    schutz: "IPX6",
    gewicht: "31 g",
  },
  {
    id: 13,
    name: "RunFit Air Lite",
    price: 62,
    teaser: "Sport-In-Ears mit besonders leichtem Gehäuse.",
    description:
      "Die RunFit Air Lite sind eine abgespeckte Variante für Einsteiger ins Lauftraining. Sie sitzen fest, ohne zu drücken, und halten Schweiß problemlos stand. Die Bedienung erfolgt über je eine Taste pro Seite.",
    image: p1,
    typ: "In-Ear",
    akku: "7 Std. (24 Std. mit Ladeschale)",
    schutz: "IPX6",
    gewicht: "4,9 g pro Ohrhörer",
  },
  {
    id: 14,
    name: "AudioMax Comfort",
    price: 94,
    teaser: "Over-Ears mit besonders großen Ohrpolstern.",
    description:
      "Die AudioMax Comfort setzen auf übergroße Polster, die das ganze Ohr umschließen. Der Anpressdruck ist bewusst gering gehalten. Auch nach mehreren Stunden bleibt das Tragegefühl angenehm.",
    image: p2,
    typ: "Over-Ear",
    akku: "32 Std.",
    schutz: "IPX2",
    gewicht: "231 g",
  },
  {
    id: 15,
    name: "PulseAudio Sport X",
    price: 71,
    teaser: "Wasserfeste In-Ears mit stabilem Sitz.",
    description:
      "Die PulseAudio Sport X kombinieren einen kurzen Stiel mit einem zusätzlichen Silikonflügel für festen Halt. Das Gehäuse ist vollständig gegen Wasser geschützt. Ein kurzer Signalton meldet niedrigen Akkustand.",
    image: p3,
    typ: "In-Ear",
    akku: "8 Std. (27 Std. mit Ladeschale)",
    schutz: "IPX7",
    gewicht: "5,3 g pro Ohrhörer",
  },
  {
    id: 16,
    name: "ClearTone Silent 40",
    price: 115,
    teaser: "Reisekopfhörer mit starker Geräuschreduktion.",
    description:
      "Die ClearTone Silent 40 sind auf lange Flug- und Bahnreisen ausgelegt und dämpfen tieffrequente Geräusche deutlich. Ein Hartschalenetui gehört zum Lieferumfang. Der Akku hält problemlos mehrere Reisetage.",
    image: p4,
    typ: "Over-Ear",
    akku: "42 Std.",
    schutz: "IPX2",
    gewicht: "248 g",
  },
  {
    id: 17,
    name: "SoftBeat Daily",
    price: 45,
    teaser: "Günstige Ohrhörer für den täglichen Gebrauch.",
    description:
      "Die SoftBeat Daily decken die Grundlagen zuverlässig ab: stabile Verbindung, klare Sprachwiedergabe, einfache Bedienung. Sie eignen sich gut als Zweitpaar für Büro oder Pendelweg. Die Ladeschale wird über USB-C geladen.",
    image: p5,
    typ: "In-Ear",
    akku: "5 Std. (18 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,6 g pro Ohrhörer",
  },
  {
    id: 18,
    name: "BassLine Motion",
    price: 68,
    teaser: "On-Ears mit faltbarem Bügel für unterwegs.",
    description:
      "Die BassLine Motion lassen sich zusammenklappen und passen so in kleine Taschen. Die Abstimmung betont Bass und untere Mitten. Ein Beutel aus Filz liegt bei.",
    image: p6,
    typ: "On-Ear",
    akku: "26 Std.",
    schutz: "IPX4",
    gewicht: "168 g",
  },
  {
    id: 19,
    name: "UrbanSound Pocket",
    price: 52,
    teaser: "Flache Ladeschale, unauffälliges Design.",
    description:
      "Die UrbanSound Pocket kommen in einer flachen Ladeschale, die kaum aufträgt. Die Ohrhörer sitzen locker und lassen sich schnell ein- und ausstöpseln. Für Sport sind sie nur bedingt geeignet.",
    image: p7,
    typ: "In-Ear",
    akku: "6 Std. (21 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,7 g pro Ohrhörer",
  },
  {
    id: 20,
    name: "RedLine Court",
    price: 88,
    teaser: "Robuste Over-Ears für Training und Halle.",
    description:
      "Die RedLine Court haben ein verstärktes Bügelgelenk und halten auch gröberer Behandlung stand. Die Polster sind abwischbar. Die Verbindung bleibt auch über größere Distanzen stabil.",
    image: p8,
    typ: "Over-Ear",
    akku: "28 Std.",
    schutz: "IPX4",
    gewicht: "244 g",
  },
  {
    id: 21,
    name: "AirFlow Duo",
    price: 76,
    teaser: "Zwei Geräte gleichzeitig verbunden.",
    description:
      "Die AirFlow Duo lassen sich parallel mit Notebook und Telefon verbinden und wechseln automatisch zur aktiven Quelle. Die Mikrofone unterdrücken Windgeräusche. Der Sitz ist flach und unauffällig.",
    image: p9,
    typ: "In-Ear",
    akku: "7 Std. (23 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "5,2 g pro Ohrhörer",
  },
  {
    id: 22,
    name: "SoundWave Metal",
    price: 97,
    teaser: "Ohrhörer mit Gehäuse aus gebürstetem Metall.",
    description:
      "Die SoundWave Metal setzen auf ein Aluminiumgehäuse, das kühl und wertig wirkt. Der Klang ist detailreich mit zurückhaltendem Bass. Die Ladeschale ist ebenfalls aus Metall gefertigt.",
    image: p10,
    typ: "In-Ear",
    akku: "8 Std. (24 Std. mit Ladeschale)",
    schutz: "IPX5",
    gewicht: "6,0 g pro Ohrhörer",
  },
  {
    id: 23,
    name: "DeepBlue Travel",
    price: 103,
    teaser: "Over-Ears mit Etui und Flugadapter.",
    description:
      "Die DeepBlue Travel sind als Reisebegleiter gedacht und bringen Etui sowie Flugadapter mit. Die Geräuschreduktion arbeitet in zwei Stufen. Der Bügel klappt vollständig ein.",
    image: p11,
    typ: "Over-Ear",
    akku: "38 Std.",
    schutz: "IPX2",
    gewicht: "236 g",
  },
  {
    id: 24,
    name: "TrailRun Band 2",
    price: 39,
    teaser: "Einfacher Sportkopfhörer zum Einstiegspreis.",
    description:
      "Der TrailRun Band 2 ist die günstigste Sportvariante im Sortiment. Der Nackenbügel sitzt fest, die Bedienung ist auf das Nötigste reduziert. Für Regen und Schweiß ist das Gehäuse ausgelegt.",
    image: p12,
    typ: "On-Ear",
    akku: "9 Std.",
    schutz: "IPX5",
    gewicht: "29 g",
  },
  {
    id: 25,
    name: "NovaSound Breeze",
    price: 59,
    teaser: "Leichte In-Ears mit luftigem Sitz für den ganzen Tag.",
    description:
      "Die NovaSound Breeze wiegen kaum fünf Gramm und liegen dank weicher Aufsätze angenehm im Ohr. Der Klang ist hell und detailreich, mit dezentem Bass. Über die Ladeschale sind rund 24 Stunden Wiedergabe möglich.",
    image: p5,
    typ: "In-Ear",
    akku: "7 Std. (24 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,8 g pro Ohrhörer",
  },
  {
    id: 26,
    name: "CloudNine Comfort 2",
    price: 99,
    teaser: "Over-Ears mit besonders weichen Polstern für lange Sessions.",
    description:
      "Die CloudNine Comfort 2 setzen auf dick gepolsterte Ohrmuscheln und ein geringes Gewicht. Die Abstimmung ist warm und ausgewogen, ideal für Musik und Hörbücher. Der Bügel lässt sich stufenlos verstellen.",
    image: p2,
    typ: "Over-Ear",
    akku: "35 Std.",
    schutz: "IPX2",
    gewicht: "226 g",
  },
  {
    id: 27,
    name: "SportBand Flex",
    price: 55,
    teaser: "Flexibler Sportkopfhörer mit wasserfestem Gehäuse.",
    description:
      "Der SportBand Flex umschließt das Ohr mit einem flexiblen, wasserabweisenden Band. Er hält Schweiß und Spritzwasser problemlos stand. Die Tasten sind so groß gebaut, dass sie auch mit Handschuhen bedienbar sind.",
    image: p6,
    typ: "On-Ear",
    akku: "18 Std.",
    schutz: "IPX5",
    gewicht: "158 g",
  },
  {
    id: 28,
    name: "EchoPods Lite",
    price: 47,
    teaser: "Einfache In-Ears mit klarer Sprachwiedergabe.",
    description:
      "Die EchoPods Lite bieten alles Wichtige: schnelles Koppeln, klare Telefonate und eine handliche Ladeschale. Der Klang ist neutral abgestimmt und für Podcasts gut geeignet. Die Bedienung erfolgt über Tasten an beiden Hörern.",
    image: p7,
    typ: "In-Ear",
    akku: "6 Std. (20 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,5 g pro Ohrhörer",
  },
  {
    id: 29,
    name: "StudioLine Reference",
    price: 129,
    teaser: "Referenzkopfhörer mit sehr detailreicher Wiedergabe.",
    description:
      "Die StudioLine Reference wurden für anspruchsvolles Hören zu Hause entwickelt. Hohe und mittlere Frequenzen werden besonders fein aufgelöst. Große, weiche Polster sorgen auch bei langen Sessions für einen angenehmen Sitz.",
    image: p11,
    typ: "Over-Ear",
    akku: "44 Std.",
    schutz: "IPX2",
    gewicht: "268 g",
  },
  {
    id: 30,
    name: "TrailRun X2",
    price: 89,
    teaser: "Robuster Trailkopfhörer mit festem Sitz und gutem Schutz.",
    description:
      "Der TrailRun X2 ist für anspruchsvolle Läufe abseits befestigter Wege gebaut. Das Gehäuse ist staub- und wassergeschützt, der Bügel sitzt auch bei schnellen Richtungswechseln fest. Eine Schnellladung reicht für zwei Stunden Wiedergabe.",
    image: p12,
    typ: "On-Ear",
    akku: "20 Std.",
    schutz: "IPX6",
    gewicht: "172 g",
  },
  {
    id: 31,
    name: "AquaBeat Swim",
    price: 78,
    teaser: "Wasserfeste In-Ears für Schwimmen und intensives Training.",
    description:
      "Die AquaBeat Swim sind vollständig wasserdicht gebaut und vertragen auch längeren Kontakt mit Schweiß und Regen. Die Aufsätze sitzen eng und rutschen nicht. Im Wasser ist die Bluetooth-Reichweite naturgemäß begrenzt.",
    image: p1,
    typ: "In-Ear",
    akku: "8 Std. (26 Std. mit Ladeschale)",
    schutz: "IPX7",
    gewicht: "5,6 g pro Ohrhörer",
  },
  {
    id: 32,
    name: "QuietMax Home",
    price: 92,
    teaser: "Bequeme Over-Ears mit sanfter Geräuschdämpfung.",
    description:
      "Die QuietMax Home dämpfen störende Alltagsgeräusche sanft ab, ohne den Klang zu verfärben. Ein Transparenzmodus lässt Gespräche bei Bedarf durch. Die Ohrmuscheln sind drehbar und lassen sich flach verstauen.",
    image: p4,
    typ: "Over-Ear",
    akku: "38 Std.",
    schutz: "IPX2",
    gewicht: "242 g",
  },
  {
    id: 33,
    name: "BassLine Street",
    price: 64,
    teaser: "On-Ears mit kräftigem Bass für den Stadtgebrauch.",
    description:
      "Der BassLine Street ist auf einen vollen, druckvollen Bass ausgelegt und eignet sich gut für Hip-Hop und Elektronik. Das robuste Gehäuse hält den Alltag im Rucksack problemlos aus. Der Bügel ist gepolstert und klappbar.",
    image: p6,
    typ: "On-Ear",
    akku: "25 Std.",
    schutz: "IPX4",
    gewicht: "181 g",
  },
  {
    id: 34,
    name: "PocketTone Slim",
    price: 43,
    teaser: "Sehr flache In-Ears mit winziger Ladeschale.",
    description:
      "Die PocketTone Slim gehören zu den kleinsten Modellen im Sortiment und verschwinden fast vollständig im Ohr. Die Ladeschale ist flacher als eine Karte. Der Klang ist ausgeglichen, mit leicht betonten Höhen.",
    image: p10,
    typ: "In-Ear",
    akku: "5 Std. (19 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,2 g pro Ohrhörer",
  },
  {
    id: 35,
    name: "ClearTone Voice Pro",
    price: 108,
    teaser: "Business-Over-Ears mit vier Mikrofonen für klare Anrufe.",
    description:
      "Die ClearTone Voice Pro richten sich an alle, die viel telefonieren. Vier Mikrofone filtern Hintergrundgeräusche aus der Stimme heraus. Die Polster sind austauschbar und lassen sich abwischen.",
    image: p4,
    typ: "Over-Ear",
    akku: "34 Std.",
    schutz: "IPX2",
    gewicht: "238 g",
  },
  {
    id: 36,
    name: "AirFlow Sport Mini",
    price: 66,
    teaser: "Kleine Sport-In-Ears mit offenem Sitz und festem Halt.",
    description:
      "Die AirFlow Sport Mini kombinieren eine halboffene Bauform mit Silikonflügeln für sicheren Halt. Umgebungsgeräusche bleiben hörbar, was beim Laufen im Freien sicherer ist. Das Gehäuse ist gegen Schweiß geschützt.",
    image: p9,
    typ: "In-Ear",
    akku: "6 Std. (21 Std. mit Ladeschale)",
    schutz: "IPX5",
    gewicht: "4,7 g pro Ohrhörer",
  },
];

/** Wörter, die keine echte Eingrenzung darstellen. */
const GENERIC_WORDS = new Set([
  "kopfhörer",
  "kopfhorer",
  "kopfhöhrer",
  "kopfhoerer",
  "headphones",
  "headphone",
  "ohrhörer",
  "ohrhoerer",
  "słuchawki",
  "sluchawki",
  "earbuds",
  "in-ears",
  "over-ears",
  "on-ears",
  "bluetooth",
  "kabellose",
  "kabellos",
  "wireless",
  "audio",
  "suche",
  "suchen",
  "gute",
  "guter",
  "gutes",
  "neue",
  "neuer",
  "neues",
  "für",
  "fuer",
  "und",
  "mit",
  "die",
  "der",
  "das",
  "ich",
  "bitte",
]);

/** Zugeordnete Farben pro Produkt (für die Stichwortsuche). */
const COLORS: Record<number, string[]> = {
  1: ["schwarz"],
  2: ["schwarz", "grau"],
  3: ["weiß", "weiss"],
  4: ["schwarz"],
  5: ["blau"],
  6: ["schwarz", "silber"],
  7: ["weiß", "weiss", "rosa"],
  8: ["schwarz"],
  9: ["grau", "silber"],
  10: ["schwarz", "rot"],
  11: ["weiß", "weiss"],
  12: ["schwarz", "blau"],
  13: ["weiß", "weiss"],
  14: ["schwarz"],
  15: ["schwarz", "rot"],
  16: ["grau"],
  17: ["schwarz"],
  18: ["blau", "schwarz"],
  19: ["weiß", "weiss", "beige"],
  20: ["schwarz"],
  21: ["rot"],
  22: ["schwarz", "grau"],
  23: ["silber", "weiß", "weiss"],
  24: ["schwarz"],
  25: ["weiß", "weiss"],
  26: ["grau"],
  27: ["schwarz", "blau"],
  28: ["schwarz"],
  29: ["schwarz"],
  30: ["schwarz", "grün"],
  31: ["blau"],
  32: ["beige", "weiß", "weiss"],
  33: ["rot", "schwarz"],
  34: ["weiß", "weiss", "silber"],
  35: ["schwarz", "silber"],
  36: ["blau", "weiß", "weiss"],
};

/** Brauchbare Stichwörter einer Suchanfrage (ohne Füllwörter). */
export function searchWords(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-zäöüß0-9]+/i)
    .filter((w) => w.length >= 3 && !GENERIC_WORDS.has(w));
}

/** Anzahl der treffenden Stichwörter für ein Produkt. */
export function matchScore(p: Product, words: string[]): number {
  if (!words.length) return 0;
  const hay =
    `${p.name} ${p.teaser} ${p.description} ${p.typ} ${(COLORS[p.id] ?? []).join(" ")}`.toLowerCase();
  let n = 0;
  for (const w of words) {
    if (hay.includes(w)) {
      n += 1;
      continue;
    }
    // Leichte Grundform-Erkennung: schwarze → schwarz, blaue → blau
    const stem = w.replace(/(?:en|es|er|e|n|s)$/, "");
    if (stem.length >= 3 && hay.includes(stem)) n += 1;
  }
  return n;
}

/**
 * Leichte, kosmetische Suche: filtert nach Stichworten in Name, Teaser,
 * Beschreibung, Bauform und Farbe. Liefert die volle Liste, wenn die Anfrage
 * keine brauchbaren Stichworte enthält oder nichts passt.
 */
export function filterProducts(query: string): Product[] {
  const words = searchWords(query);
  if (!words.length) return PRODUCTS;
  const matches = PRODUCTS.filter((p) => matchScore(p, words) > 0);
  return matches.length ? matches : PRODUCTS;
}
