"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Journal", href: "/journal" },
  { label: "Artists", href: "/artists" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-line sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <span className="font-serif text-[22px] font-bold text-ash tracking-tight">
            Ceramics<span className="text-ember">IQ</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-7">
          {navItems.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm no-underline transition-colors pb-0.5 ${
                  active
                    ? "font-semibold text-ash border-b-2 border-ember"
                    : "text-smoke hover:text-ash border-b-2 border-transparent"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/subscribe"
            className="text-sm font-semibold text-white bg-ember px-4 py-1.5 rounded-sm no-underline hover:opacity-90 transition-opacity"
          >
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
}
