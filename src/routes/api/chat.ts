import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleShopBotChat } = await import("@/lib/shopbot.server");
        return handleShopBotChat(request);
      },
    },
  },
});
