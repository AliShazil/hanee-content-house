import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-6 py-6 sm:px-10">
      <div />
      <Logo />
      <button
        type="button"
        aria-label="Open menu"
        className="justify-self-end text-white/90 transition-colors hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" aria-hidden="true">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
