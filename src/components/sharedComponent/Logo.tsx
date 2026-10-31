import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2c8362] to-[#123a2b] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_24px_-12px_var(--brand)] ring-1 ring-white/30">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="size-8"
        >
          <path
            d="M12 13.2V7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M11.6 11.2C10 8.6 7.9 7.4 5.6 7.7c.1 2.4 1.6 4.2 3.9 4.6.8.2 1.6.1 2.1-.2Z"
            fill="currentColor"
          />
          <path
            d="M12.4 9.4c1.6-2.6 3.7-3.8 6-3.5-.1 2.4-1.6 4.2-3.9 4.6-.8.2-1.6.1-2.1-.2Z"
            fill="currentColor"
          />
          <path
            d="M6.3 16.4c0 3.4 2.6 6.1 5.7 6.1s5.7-2.7 5.7-6.1h-2.2c0 2.2-1.6 3.9-3.5 3.9s-3.5-1.7-3.5-3.9H6.3Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-logo text-[20px] leading-none font-bold tracking-tight text-brand-dark">
          Youth Foundation
        </span>
        <span className="text-[9px] leading-none font-semibold tracking-[0.3em] text-brand uppercase">
          Rohanpur
        </span>
      </span>
    </Link>
  );
}
