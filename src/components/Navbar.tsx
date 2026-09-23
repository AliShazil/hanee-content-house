import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-6 py-6 sm:px-10">
      <div />
      <Logo />
      <div />
    </header>
  );
}
