"use client";

import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export function EmailCapture({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const dark = variant === "dark";

  if (state === "success") {
    return (
      <p className="text-sm font-semibold text-ember">
        You&apos;re in. First dispatch incoming.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-[420px] w-full">
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={state === "loading"}
          className={`flex-1 px-4 py-3 text-sm border border-r-0 outline-none focus:ring-2 focus:ring-ember disabled:opacity-60 ${
            dark
              ? "bg-white/5 border-white/15 text-[#ddd] placeholder:text-[#666]"
              : "bg-white border-line text-ash placeholder:text-smoke"
          }`}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-6 py-3 text-sm font-semibold bg-ember text-white border-none cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {state === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {state === "error" && (
        <p className={`text-xs ${dark ? "text-red-400" : "text-red-600"}`}>
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
