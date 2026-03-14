"use client";

const TICKER_ITEMS = [
  "Welcome to ABC Acropolis — Your College Cloud",
  "Tech Fest 2025 — April 15–17",
  "Cultural Night — March 22",
  "Career Fair — May 10",
  "Join our clubs and events",
  "Stay updated with the Newspaper",
  "Explore the Gallery",
];

export function TickerLine() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative flex w-full overflow-hidden border-y border-accent-secondary/20 bg-bg-card py-2">
      <div className="animate-ticker flex shrink-0 gap-12">
        {repeated.map((text, i) => (
          <span
            key={`${i}-${text}`}
            className="whitespace-nowrap text-sm font-medium text-accent-primary"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
