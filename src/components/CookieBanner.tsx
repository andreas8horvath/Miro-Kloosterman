import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:max-w-md z-[100] bg-deep-forest p-8 shadow-tactile border border-gold/20 grain"
        >
          <div className="relative z-10">
            <span className="label !text-gold !mb-4">Privacy Preference</span>
            <h3 className="text-white text-xl mb-4 font-display">We value your privacy.</h3>
            <p className="text-sand/60 text-sm font-light leading-relaxed mb-8">
              We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with our <a href="/cookies" className="text-gold hover:underline">Cookie Policy</a>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAccept}
                className="btn-primary !px-6 !py-3 !text-[10px] flex-1"
              >
                Accept All
              </button>
              <button 
                onClick={handleDecline}
                className="btn-outline !px-6 !py-3 !text-[10px] !border-white/20 !text-white hover:!bg-white hover:!text-deep-forest flex-1"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
