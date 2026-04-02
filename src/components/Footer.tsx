import Link from "next/link";
import { EmailCapture } from "./EmailCapture";

export function Footer() {
  return (
    <footer className="bg-ash pt-12 pb-7 px-8">
      <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-9">
        {/* Brand */}
        <div>
          <Link href="/" className="no-underline">
            <span className="font-serif text-xl font-bold text-white tracking-tight">
              Ceramics<span className="text-ember">IQ</span>
            </span>
          </Link>
          <p className="text-[13px] text-[#666] max-w-[260px] leading-relaxed mt-3">
            Technique deep-dives, artist features, and collector intelligence.
            Built by a working ceramicist.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#555] mb-3.5">
              Explore
            </h4>
            {[
              { label: "Journal", href: "/journal" },
              { label: "Artists", href: "/artists" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="block text-[13px] text-[#777] no-underline mb-2 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#555] mb-3.5">
              Follow
            </h4>
            {[
              { label: "YouTube", href: "https://www.youtube.com/@CeramicsIQ" },
              { label: "Instagram", href: "#" },
              { label: "Pinterest", href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[13px] text-[#777] no-underline mb-2 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#555] mb-3.5">
            Subscribe
          </h4>
          <EmailCapture variant="dark" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-5 border-t border-white/[0.08] flex justify-between items-center">
        <span className="text-xs text-[#555]">© 2026 CeramicsIQ™</span>
        <div className="flex gap-5">
          <Link href="#" className="text-xs text-[#555] no-underline hover:text-[#888]">
            Privacy
          </Link>
          <Link href="#" className="text-xs text-[#555] no-underline hover:text-[#888]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
import Link from "next/link";
import { EmailCapture } from "./EmailCapture";

export function Footer() {
  return (
    <footer className="bg-ash pt-12 pb-7 px-8">
      <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-9">
        {/* Brand */}
        <div>
          <Link href="/" className="no-underline">
            <span className="font-serif text-xl font-bold text-white tracking-tight">
              Ceramics<span className="text-ember">IQ</span>
            </span>
          </Link>
          <p className="text-[13px] text-[#666] max-w-[260px] leading-relaxed mt-3">
            Technique deep-dives, artist features, and collector intelligence.
            Built by a working ceramicist.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#555] mb-3.5">
              Explore
            </h4>
            {[
              { label: "Journal", href: "/journal" },
              { label: "Artists", href: "/artists" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="block text-[13px] text-[#777] no-underline mb-2 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#555] mb-3.5">
              Follow
            </h4>
            {[
              { label: "YouTube", href: "https://www.youtube.com/@CeramicsIQ" },
              { label: "Instagram", href: "#" },
              { label: "Pinterest", href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[13px] text-[#777] no-underline mb-2 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#555] mb-3.5">
            Subscribe
          </h4>
          <EmailCapture variant="dark" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-5 border-t border-white/[0.08] flex justify-between items-center">
        <span className="text-xs text-[#555]">© 2026 CeramicsIQ</span>
        <div className="flex gap-5">
          <Link href="#" className="text-xs text-[#555] no-underline hover:text-[#888]">
            Privacy
          </Link>
          <Link href="#" className="text-xs text-[#555] no-underline hover:text-[#888]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
