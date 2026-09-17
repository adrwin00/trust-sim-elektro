import lautsprecher1 from "@/assets/cat/lautsprecher-1.jpg";
import lautsprecher2 from "@/assets/cat/lautsprecher-2.jpg";
import smartwatches1 from "@/assets/cat/smartwatches-1.jpg";
import smartwatches2 from "@/assets/cat/smartwatches-2.jpg";
import laptops1 from "@/assets/cat/laptops-1.jpg";
import laptops2 from "@/assets/cat/laptops-2.jpg";
import smartHome1 from "@/assets/cat/smart-home-1.jpg";
import smartHome2 from "@/assets/cat/smart-home-2.jpg";
import gaming1 from "@/assets/cat/gaming-1.jpg";
import gaming2 from "@/assets/cat/gaming-2.jpg";
import handy1 from "@/assets/cat/handy-tablet-1.jpg";
import handy2 from "@/assets/cat/handy-tablet-2.jpg";
import haushalt1 from "@/assets/cat/haushalt-1.jpg";
import haushalt2 from "@/assets/cat/haushalt-2.jpg";
import angebote1 from "@/assets/cat/angebote-1.jpg";
import angebote2 from "@/assets/cat/angebote-2.jpg";
import computer1 from "@/assets/cat/computer-1.jpg";
import computer2 from "@/assets/cat/computer-2.jpg";
import audio1 from "@/assets/cat/audio-1.jpg";
import audio2 from "@/assets/cat/audio-2.jpg";

const IMAGES: Record<string, string[]> = {
  lautsprecher: [lautsprecher1, lautsprecher2],
  smartwatches: [smartwatches1, smartwatches2],
  laptops: [laptops1, laptops2],
  "smart-home": [smartHome1, smartHome2],
  gaming: [gaming1, gaming2],
  "handy-tablet": [handy1, handy2],
  haushalt: [haushalt1, haushalt2],
  angebote: [angebote1, angebote2, audio1, computer1],
  computer: [computer1, computer2, laptops1],
  audio: [audio1, audio2, lautsprecher1],
};

const FALLBACK = [audio2, computer1, haushalt1];

/** Deterministic photo for a product inside a category. */
export function catImage(slug: string, index: number): string {
  const pool = IMAGES[slug] ?? FALLBACK;
  return pool[index % pool.length]!;
}
