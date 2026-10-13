import { motion } from "framer-motion";
import { StudioBackdrop } from "../components/backdrops/StudioBackdrop";
import { CTAButton } from "../components/ui";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      <StudioBackdrop soft />

      <div className="relative mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl font-semibold tracking-[-0.03em] text-ink-900 sm:text-8xl"
        >
          <span className="gradient-text">404</span>
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
        >
          Page not found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-lg leading-relaxed text-ink-600"
        >
          The page you're looking for doesn't exist or has moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <CTAButton href="/" size="lg">
            Back to Home
          </CTAButton>
          <CTAButton href="/services.html" variant="outline" size="lg" arrow>
            Explore Our Services
          </CTAButton>
        </motion.div>
      </div>
    </main>
  );
}
