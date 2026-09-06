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
];
