export function Logo() {
  return (
    <a
      href="#"
      className="flex items-center gap-1 font-inter text-xl font-bold tracking-tight text-white sm:text-2xl"
    >
      <span>C</span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 sm:h-6 sm:w-6">
        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-white" aria-hidden="true">
          <path d="M6 4.5v15l14-7.5-14-7.5z" />
        </svg>
      </span>
      <span>ntentHouse</span>
      <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-violet-600" />
    </a>
  );
}
