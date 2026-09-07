/** Deterministic, fixed presentation data per product id. */
export function ratingFor(id: number) {
  return 3.9 + ((id * 7) % 11) / 10;
}

export function reviewsFor(id: number) {
  return 42 + ((id * 137) % 860);
}

export function discountFor(id: number): number | null {
  if (id % 4 !== 0) return null;
  return [10, 15, 20, 25][(id / 4) % 4] ?? 20;
}
