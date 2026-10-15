import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-field mt-auto relative z-10 pt-10 pb-7 px-[5%] text-ink-900 overflow-hidden">

      {/* Decorative Ribbons & Textures */}
      <div className="footer-ribbon footer-ribbon--bloom"></div>
      <div className="footer-ribbon footer-ribbon--rose"></div>
      <div className="footer-ribbon footer-ribbon--violet"></div>
      <div className="footer-ribbon footer-ribbon--green"></div>
      <div className="footer-grain"></div>
      <div className="footer-dither"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-5">

          {/* Brand & Social */}
          <div className="flex-1 min-w-[300px] max-w-[350px]">
            <div className="flex items-center text-[24px] font-bold text-ink-900 mb-4 font-display">
               <img src="/logo.png" alt="HRCM logo" style={{ marginRight: '12px', height: '44px', width: '44px', objectFit: 'contain' }} />
               HRCM
            </div>
            <p className="text-[15px] leading-[1.6] text-ink-600 mb-5">
              Join hospitals across India already using HRCM to take control of their revenue cycle.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="X" className="footer-social"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" aria-label="Instagram" className="footer-social"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000 2.881z"/></svg></a>
              <a href="#" aria-label="LinkedIn" className="footer-social"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href="#" aria-label="YouTube" className="footer-social"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            </div>
          </div>

          {/* Links */}
          <div className="flex-[2] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[30px]">
            <div>
              <h4 className="footer-heading mb-4">Company</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-3"><a href="#" className="footer-link">Home</a></li>
                <li className="mb-3"><a href="#" className="footer-link">About Us</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Our Services</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Why Choose Us</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Our Team</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Get In Touch</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading mb-4">Services</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-3"><a href="#" className="footer-link">Claims Audit & Analysis</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Claims Processing & Submission</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Accounts Receivable Management</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Revenue Reconciliation</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Medical Billing</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Query Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading mb-4">Contact</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-3 text-[14px] leading-[1.5] text-ink-600">+91 98688 08775</li>
                <li className="mb-3 text-[14px] leading-[1.5] text-ink-600">+91 80102 85464</li>
                <li className="mb-3 text-[14px] leading-[1.5] text-ink-600">info@hrcm.in</li>
                <li className="mb-3 text-[14px] leading-[1.5] text-ink-600">Tower 4, office no 1611, NX One,<br />Plot No. 17, Sector Techzone-4,<br />Surajpur, Gautam Buddha<br />Nagar, Noida, Uttar Pradesh</li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading mb-4">Legal</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-3"><a href="#" className="footer-link">Terms & Conditions</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Privacy Policy</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Contact Us</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
         <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-[rgba(16,24,40,0.12)] text-[13px] text-ink-600 gap-5">
          <div className="flex flex-col gap-[6px]">
            <span>Copyright © 2026 HRCM. All Rights Reserved.</span>
            <span>
              Designed by <a href="https://skorainfotech.com" className="font-semibold text-sprout-600 hover:text-azure-600 transition-colors duration-250 ease-in hover:underline" target="_blank" rel="noopener noreferrer">SkoraInfotech</a>
            </span>
          </div>
          <div className="text-right max-w-[400px] md:text-center md:max-w-full">
            End-to-end revenue cycle management, run by one accountable team.
          </div>
        </div>
      </div>
    </footer>
  );
};

// Named export so App.tsx's `import { Footer }` resolves; the default
// export is kept for direct file imports.
export { Footer };
export default Footer;
