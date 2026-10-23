import React, { useState, useCallback } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 600, y: 150 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="footer-field mt-auto relative z-10 pt-14 pb-8 px-4 sm:px-8 lg:px-12 text-ink-900 overflow-hidden"
    >
      {/* ── 1. Animated Liquid Shimmer Top Border ── */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] overflow-hidden pointer-events-none z-20">
        <div
          className="w-full h-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0, 113, 227, 0.25) 20%, rgba(255, 255, 255, 0.95) 50%, rgba(15, 163, 160, 0.3) 80%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerSweep 8s linear infinite',
          }}
        />
      </div>

      {/* ── 2. Interactive Fluid Spotlight (Follows Mouse Cursor) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: isHovered ? 1 : 0.45,
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 113, 227, 0.12), rgba(15, 163, 160, 0.08) 40%, transparent 75%)`,
        }}
      />

      {/* ── 3. Animated Fluid Aurora Ribbons (Living Liquid Wave Motion) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Ribbon 1: Upper Bloom */}
        <div
          className="absolute -left-1/4 -right-1/4 h-[75%] opacity-75 blur-3xl"
          style={{
            top: '-15%',
            background:
              'radial-gradient(55% 100% at 50% 0%, rgba(234, 245, 252, 0.85) 0%, rgba(240, 248, 255, 0.4) 60%, transparent 100%)',
            animation: 'auroraFloat1 12s ease-in-out infinite',
          }}
        />

        {/* Ribbon 2: Cyan / Emerald Fluid Wave */}
        <div
          className="absolute -left-1/3 -right-1/3 h-[60%] opacity-65 blur-3xl mix-blend-multiply"
          style={{
            bottom: '10%',
            background:
              'linear-gradient(95deg, rgba(15, 163, 160, 0) 0%, rgba(15, 163, 160, 0.45) 28%, rgba(70, 201, 125, 0.5) 60%, rgba(15, 163, 160, 0) 100%)',
            animation: 'auroraFloat2 15s ease-in-out infinite alternate',
          }}
        />

        {/* Ribbon 3: Azure / Violet Fluid Accent Wave */}
        <div
          className="absolute -left-1/4 -right-1/4 h-[70%] opacity-55 blur-3xl mix-blend-multiply"
          style={{
            bottom: '0%',
            background:
              'linear-gradient(85deg, rgba(0, 113, 227, 0) 0%, rgba(0, 113, 227, 0.35) 32%, rgba(147, 112, 219, 0.4) 68%, rgba(0, 113, 227, 0) 100%)',
            animation: 'auroraFloat3 18s ease-in-out infinite alternate',
          }}
        />

        {/* Subtle Organic Texture Filter */}
        <div className="footer-grain opacity-30" />
      </div>

      {/* ── 4. Main Liquid Glass Content Container ── */}
      <div className="relative z-10 max-w-[102rem] mx-auto">
        <div
          className="relative rounded-[32px] p-8 sm:p-12 lg:p-14 overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.68)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.92)',
            boxShadow:
              '0 20px 48px -12px rgba(16, 24, 40, 0.07), 0 2px 6px rgba(16, 24, 40, 0.02), inset 0 1px 2px rgba(255, 255, 255, 1)',
          }}
        >
          {/* Top Liquid Edge Reflection Line */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 5%, rgba(255, 255, 255, 0.95) 25%, rgba(0, 113, 227, 0.4) 50%, rgba(255, 255, 255, 0.95) 75%, transparent 95%)',
            }}
          />

          {/* Top Bar: Brand, Status Badge & Back To Top Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-10 mb-10 border-b border-slate-200/70 gap-6">
            <div className="flex items-center gap-5">
              <a href="/" className="inline-flex items-center" aria-label="HRCM home">
                <img
                  src="/logo.png"
                  alt="HRCM logo"
                  className="h-20 w-20 sm:h-24 sm:w-24 object-contain transition-transform duration-300 hover:rotate-3 hover:scale-105"
                />
              </a>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Pan-India 24/7 Ops Active</span>
              </div>
            </div>

            {/* Back to top liquid pill button */}
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-white/80 hover:bg-white border border-slate-200/80 hover:border-azure-400/60 px-4 py-2 text-xs font-semibold text-[#0f172a] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#0071e3] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Grid: Brand Info + 4 Navigation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
            {/* Column 1: Mission & Social (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <p className="text-[15px] leading-[1.68] text-[#475467] font-sans max-w-sm">
                  Join leading hospital networks across India using HRCM to eliminate revenue leakage, accelerate claim settlement, and take full control of their financial lifecycle.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-azure-500" />
                  <span>ISO 27001 & HIPAA Compliant Workflows</span>
                </div>
              </div>

              {/* Social Media Glass Badges */}
              <div className="mt-6 flex items-center gap-3">
                {[
                  {
                    name: 'X',
                    href: '#',
                    svg: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                  },
                  {
                    name: 'Instagram',
                    href: '#',
                    svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000 2.881z',
                  },
                  {
                    name: 'LinkedIn',
                    href: '#',
                    svg: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                  },
                  {
                    name: 'YouTube',
                    href: '#',
                    svg: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-[#0071e3] border border-slate-200/80 hover:border-azure-300 shadow-sm hover:shadow-[0_8px_20px_rgba(0,113,227,0.2)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d={social.svg} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Company Navigation (2 Cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] font-mono mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm font-sans text-[#475467]">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'HRCM Software', href: '/software.html' },
                  { label: 'About Us', href: '/about.html' },
                  { label: 'Our Services', href: '/services.html' },
                  { label: 'Why Choose Us', href: '/why-choose-us.html' },
                  { label: 'Our Team', href: '/our-team.html' },
                  { label: 'Careers', href: '/careers.html' },
                  { label: 'Get In Touch', href: '/get-in-touch.html' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1.5 hover:text-[#0071e3]"
                    >
                      <span className="h-1 w-1 rounded-full bg-azure-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services Links (3 Cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] font-mono mb-4">
                Services
              </h4>
              <ul className="space-y-2.5 text-sm font-sans text-[#475467]">
                {[
                  { label: 'Claims Processing & Submission', href: '/services/claims-processing-and-submission.html' },
                  { label: 'Claims Audit & Analysis', href: '/services/claims-audit-and-analysis.html' },
                  { label: 'Query Management', href: '/services/query-management.html' },
                  { label: 'Accounts Receivable Management', href: '/services/accounts-receivable-management.html' },
                  { label: 'Revenue Reconciliation', href: '/services/revenue-reconciliation.html' },
                  { label: 'Data Management', href: '/services/data-management.html' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1.5 hover:text-[#0071e3]"
                    >
                      <span className="h-1 w-1 rounded-full bg-azure-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & HQ (3 Cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] font-mono mb-4">
                Greater Noida Headquarters
              </h4>
              <div className="space-y-3 text-sm font-sans text-[#475467]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0f172a]">Direct:</span>
                  <a href="tel:+918010285464" className="hover:text-[#0071e3] transition-colors">
                    +91 80102 85464
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0f172a]">Email:</span>
                  <a href="mailto:info@hrcm.in" className="hover:text-[#0071e3] transition-colors">
                    info@hrcm.in
                  </a>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#64748b]">
                  Tower 4, Office No. 1611, NX One, Plot No. 17, Sector Techzone-4, Surajpur, Greater Noida, UP 201306
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Skora Credit */}
          <div className="pt-6 border-t border-slate-200/70 flex flex-col md:flex-row justify-between items-center text-xs text-[#64748b] gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span>© {new Date().getFullYear()} HRCM Healthcare Technologies. All Rights Reserved.</span>
              <span className="hidden sm:inline">·</span>
              <span>
                Engineered by{' '}
                <a
                  href="https://skorainfotech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0071e3] hover:underline"
                >
                  SkoraInfotech
                </a>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a href="/legal/terms.html" className="hover:text-[#0071e3] transition-colors">Terms</a>
              <a href="/legal/privacy.html" className="hover:text-[#0071e3] transition-colors">Privacy</a>
              <a href="/get-in-touch.html" className="hover:text-[#0071e3] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe Animations for Liquid Shimmer & Fluid Ribbons ── */}
      <style>{`
        @keyframes shimmerSweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes auroraFloat1 {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-24px) scale(1.08) rotate(1.5deg); }
        }
        @keyframes auroraFloat2 {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(18px) scale(1.1) rotate(-1.5deg); }
        }
        @keyframes auroraFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, -15px) scale(1.05); }
        }
      `}</style>
    </footer>
  );
};

export { Footer };
export default Footer;
