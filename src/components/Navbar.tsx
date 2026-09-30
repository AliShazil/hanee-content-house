import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 bg-black/30 px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 sm:px-10 sm:py-5">
      {/* Faint purple sheen along the bottom edge of the glass */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      <div />
      <Logo />
      <div />
    </header>
  );
}
