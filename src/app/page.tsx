export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-border-subtle bg-surface p-6">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Design Tokens Active
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          The Minimal Fintech architecture is wired via Tailwind v4 CSS variables. Try toggling your system dark mode!
        </p>
        <button className="mt-6 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary font-medium text-white transition-colors hover:bg-primary-hover">
          Confirm & Commit
        </button>
      </div>
    </main>
  );
}