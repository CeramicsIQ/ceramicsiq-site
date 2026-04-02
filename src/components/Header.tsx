"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Journal", href: "/journal" },
  { label: "Artists", href: "/artists" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-line sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="no-underline" onClick={() => setMenuOpen(false)}>
          <span className="font-serif text-[22px] font-bold text-ash tracking-tight">
            Ceramics<span className="text-ember">IQ</span><sup className="text-[10px] align-super ml-px">™</sup>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-5 h-0.5 bg-ash transition-transform duration-200 origin-center ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ash transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ash transition-transform duration-200 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-line bg-white px-6 py-5 flex flex-col gap-4">
          {navItems.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm no-underline transition-colors ${
                  active ? "font-semibold text-ash" : "text-smoke hover:text-ash"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/subscribe"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-white bg-ember px-4 py-2.5 rounded-sm no-underline hover:opacity-90 transition-opacity text-center mt-1"
          >
            Subscribe
          </Link>
        </div>
      )}
    </header>
  );
}
