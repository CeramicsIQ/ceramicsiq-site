"use client";

import { useState } from "react";

export function EmailCapture({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const dark = variant === "dark";

  if (done) {
    return (
      <p className="text-sm font-semibold text-ember">
        You&apos;re in. First dispatch incoming.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setDone(true);
      }}
      className="flex max-w-[420px]"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className={`flex-1 px-4 py-3 text-sm border border-r-0 outline-none focus:ring-2 focus:ring-ember ${
          dark
            ? "bg-white/5 border-white/15 text-[#ddd] placeholder:text-[#666]"
            : "bg-white border-line text-ash placeholder:text-smoke"
        }`}
      />
      <button
        type="submit"
        className="px-6 py-3 text-sm font-semibold bg-ember text-white border-none cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity"
      >
        Subscribe
      </button>
    </form>
  );
}
