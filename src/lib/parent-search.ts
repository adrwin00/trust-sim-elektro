/**
 * Sends the submitted search term to the embedding parent page (e.g. the
 * survey tool that shows this shop inside an iframe) as a postMessage, so the
 * parent can append ?search=<term> to its own URL / store the value.
 *
 * Cross-origin parents cannot be navigated directly — postMessage is the only
 * reliable channel; the survey page must listen for these messages.
 */
const CHANNEL = "elektropunkt:search";

export function reportSearchToParent(term: string) {
  const q = term.trim();
  if (!q || typeof window === "undefined") return;
  const message = { channel: CHANNEL, search: q };
  for (const win of [window.parent, window.top]) {
    try {
      if (win && win !== window) win.postMessage(message, "*");
    } catch {
      // Access to a cross-origin frame failed — postMessage target unavailable.
    }
  }
}
