import { CTAButton } from "../components/ui";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy-950 pt-24 text-white">
      <div
        aria-hidden
        className="animate-gradient-drift pointer-events-none absolute inset-0 bg-[radial-gradient(800px_420px_at_20%_10%,rgb(8_88_184/0.35),transparent_60%),radial-gradient(600px_360px_at_85%_80%,rgb(8_168_248/0.18),transparent_55%)] bg-[length:180%_180%]"
      />
      <div className="relative mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <p className="text-7xl font-bold tracking-tight text-azure-400 sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Page not found</h1>
        <p className="mt-3 text-base leading-relaxed text-navy-100/80">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <CTAButton href="/" variant="primary">
            Back to Home
          </CTAButton>
          <CTAButton href="/services.html" variant="ghost-light">
            Explore Our Services
          </CTAButton>
        </div>
      </div>
    </main>
  );
}
