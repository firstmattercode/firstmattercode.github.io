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

      {/* Parked until the copy is reworded — restore by removing the
          comment wrapper. */}
      {/*
      <section className="mt-16">
        <h2 className="text-sm font-medium tracking-widest text-mist-500 uppercase">
          About
        </h2>
        <div className="mt-6 max-w-xl space-y-4 text-base/7 text-mist-700 dark:text-mist-400">
          <p>
            First Matter Code is an independent software studio based in
            Charlottesville, Virginia, building applications for Apple
            platforms.
          </p>
          <p>
            Founded in August 2026 by Jonathan Esposito, the studio designs,
            builds, and publishes its own software. Its first applications are
            in development for iPhone.
          </p>
        </div>
      </section>
      */}

      <section className="mt-16">
        <h2 className="text-sm font-medium tracking-widest text-mist-500 uppercase">
          Company
        </h2>
        {/* Name and city are what an entity check matches against; they
            need to read as the LLC's filed name, not as a form. */}
        <div className="mt-6 text-sm/7">
          <p className="text-mist-700 dark:text-mist-400">First Matter Code LLC</p>
          <p className="text-mist-700 dark:text-mist-400">
            Charlottesville, Virginia
          </p>
        </div>
      </section>

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
