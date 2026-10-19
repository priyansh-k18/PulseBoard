import { connection, NextRequest } from "next/server";

const realtimePool = [
  {
    type: "social" as const,
    title:
      "@techinsider: Open-source local AI models benchmarked on new hardware — 3x speedup reported! 🚀",
    description:
      "Community benchmarks reveal dramatic quantization improvements with zero perceptible perplexity loss.",
    source: "X / @techinsider",
    category: "technology",
    ctaLabel: "View Thread",
  },
  {
    type: "news" as const,
    title:
      "Global Markets Update: Clean energy tech investments surge by 24% this quarter",
    description:
      "Venture funding rebounds strongly led by next-generation battery and grid storage startups.",
    source: "Financial Post",
    category: "finance",
    ctaLabel: "Read More",
  },
  {
    type: "social" as const,
    title:
      "@cinephile: Stunning 4K restoration of classic cinema masterpiece announced for summer release",
    description:
      "Includes previously unreleased director commentary and archival behind-the-scenes footage.",
    source: "Instagram / @cinephile",
    category: "entertainment",
    ctaLabel: "Explore",
  },
  {
    type: "news" as const,
    title:
      "Championship Playoffs: Underdog squad clinches dramatic overtime victory",
    description:
      "A buzzer-beater 3-pointer sealed one of the most thrilling playoff upsets in modern franchise history.",
    source: "Sports Illustrated",
    category: "sports",
    ctaLabel: "Read Recap",
  },
  {
    type: "social" as const,
    title:
      "@sciencegeek: James Webb Space Telescope captures rare molecular clouds in nearby nebula 🔭",
    description:
      "Spectroscopy reveals high concentrations of organic prebiotic molecules.",
    source: "X / @sciencegeek",
    category: "science",
    ctaLabel: "View Image",
  },
  {
    type: "news" as const,
    title:
      "Breakthrough study reveals how 20-minute daily walking reverses metabolic syndrome risks",
    description:
      "Peer-reviewed longitudinal trial of 15,000 participants publishes promising findings.",
    source: "Health Science Journal",
    category: "health",
    ctaLabel: "Read Study",
  },
];

export async function GET(request: NextRequest) {
  await connection();
  let counter = 0;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connect acknowledgement
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "connected", timestamp: new Date().toISOString() })}\n\n`,
        ),
      );

      const interval = setInterval(() => {
        counter++;
        const itemTemplate = realtimePool[counter % realtimePool.length];
        const newItem = {
          ...itemTemplate,
          id: `realtime-${Date.now()}-${counter}`,
          imageUrl: `https://picsum.photos/seed/realtime-${counter}/640/360`,
          url: "https://example.com/realtime",
          publishedAt: new Date().toISOString(),
        };

        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "new_item", item: newItem })}\n\n`,
            ),
          );
        } catch {
          clearInterval(interval);
        }
      }, 7000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
