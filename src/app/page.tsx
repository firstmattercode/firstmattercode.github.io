// The whole site: one page, no navigation. Sections are added by writing
// them here — there is no CMS and no data layer.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col px-6 py-24">
      <h1 className="font-display text-6xl/none tracking-tight text-balance text-mist-950 sm:text-8xl dark:text-white">
        First Matter Code
      </h1>

      <p className="mt-6 max-w-xl text-lg/8 text-mist-700 dark:text-mist-400">
        An independent software studio.
      </p>

      <a
        href="https://github.com/firstmattercode"
        className="mt-8 -ml-4 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm/7 font-medium text-mist-950 transition-colors hover:bg-mist-950/10 dark:text-white dark:hover:bg-white/10"
      >
        View on GitHub
        <svg
          width={13}
          height={7}
          viewBox="0 0 13 7"
          fill="none"
          strokeWidth={1}
          aria-hidden="true"
          className="inline-block"
        >
          <path
            d="M12.5049 3.49512L0.504883 3.49512"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 6.5L12.5 3.5L9.5 0.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <section className="mt-16">
        <h2 className="text-sm font-medium tracking-widest text-mist-500 uppercase">
          Contact
        </h2>
        <div className="mt-6 text-sm/7">
          <a
            href="mailto:jonathan@firstmattercode.com"
            className="font-semibold text-mist-950 underline decoration-mist-300 decoration-1 underline-offset-4 transition-colors hover:decoration-mist-950 dark:text-white dark:decoration-mist-700 dark:hover:decoration-white"
          >
            Jonathan Esposito
          </a>
          <p className="text-mist-700 dark:text-mist-400">Founder</p>
        </div>
      </section>

      {/* The year is baked in at build time — a push to main refreshes it. */}
      <footer className="mt-24 text-sm/7 text-mist-500">
        © {new Date().getFullYear()} First Matter Code LLC
      </footer>
    </main>
  )
}
