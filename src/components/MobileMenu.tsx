import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

interface MobileMenuProps {
  navItems: NavItem[];
  siteName: string;
}

export const MobileMenu = ({ navItems, siteName }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-sand overflow-y-auto"
        >
          <div className="px-section-x py-8">
            <div className="flex justify-between items-center mb-16">
              <a href="/" className="font-display text-4xl text-deep-forest tracking-tight">
                {siteName}
              </a>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-deep-forest p-2"
                aria-label="Close Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a 
                    href={item.href}
                    className="font-nav text-3xl text-deep-forest hover:text-gold transition-colors block mb-6 italic"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.children && (
                    <div className="flex flex-col gap-4 pl-4 border-l border-gold/20 mb-8">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="font-nav text-xs font-medium uppercase tracking-[2px] text-sage hover:text-gold transition-colors italic"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="mt-24 pt-12 border-t border-deep-forest/5">
              <span className="label !mb-4">Get in touch</span>
              <p className="text-sm mb-8">info@mirokloosterman.com</p>
              <a 
                href="https://tidycal.com/miro-kloosterman/15-minute-meeting" 
                className="btn-primary w-full text-center"
              >
                Book a discovery call
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="text-deep-forest p-2"
        aria-label="Open Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {mounted && createPortal(menuContent, document.body)}
    </div>
  );
};
