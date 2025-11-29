export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="w-full max-w-3xl space-y-8 rounded-2xl border border-border bg-card p-10 shadow-sm">
        <header className="space-y-2 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Expense Tracker (Manual Categories)
          </p>
          <h1 className="text-3xl font-bold tracking-tight">AI-free, manual-first workflow</h1>
          <p className="text-muted-foreground">
            This scaffold intentionally omits AI services, auto-categorization, or background suggestions. Every
            expense will rely on the categories you create and manage yourself.
          </p>
        </header>

        <section className="grid gap-6 rounded-xl bg-muted/40 p-6 sm:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">How categorization works</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Define your own categories in settings.</li>
              <li>• Each expense form will present only those categories—no auto-complete or AI labels.</li>
              <li>• Rename or delete categories to keep historical data tidy; expenses update accordingly.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">What&apos;s included now</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Local-storage persistence with storage events for cross-tab sync.</li>
              <li>• Currency settings and exchange-rate helpers without any AI enrichment.</li>
              <li>• Tailwind + shadcn/ui styling foundation to build the remaining screens.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-dashed border-border/70 p-6">
          <h2 className="text-lg font-semibold">Next steps to finish the app</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>1. Build the Settings page to manage currencies and manual categories.</li>
            <li>2. Add the Expense form with a simple category select (no AI auto-fill).</li>
            <li>3. Create dashboard and recoveries views using the provided hooks.</li>
            <li>4. Keep the experience manual—avoid adding GPT or automated labeling.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
