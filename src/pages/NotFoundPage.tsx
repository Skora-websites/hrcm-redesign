import { CTAButton } from "../components/ui";
import { TechCanvas } from "../components/TechCanvas";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-[80vh] items-center overflow-hidden bg-white pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <TechCanvas density={0.00006} />
        <div className="absolute inset-0 bg-[radial-gradient(800px_420px_at_20%_10%,rgb(14_165_233/0.12),transparent_60%),radial-gradient(600px_360px_at_85%_80%,rgb(16_185_129/0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white" />
      </div>
      <div className="relative mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <p className="text-7xl font-bold tracking-tight text-azure-500 sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-navy-900 sm:text-3xl">Page not found</h1>
        <p className="mt-3 text-base leading-relaxed text-ink-600">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <CTAButton href="/" variant="primary">
            Back to Home
          </CTAButton>
          <CTAButton href="/services.html" variant="outline">
            Explore Our Services
          </CTAButton>
        </div>
      </div>
    </main>
  );
}
