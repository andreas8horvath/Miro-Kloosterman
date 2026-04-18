import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('newsletter-dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 7000); // Show after 7 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('newsletter-dismissed', 'true');
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you'd send this to your API
      console.log('Subscribing:', email);
      setIsSubmitted(true);
      localStorage.setItem('newsletter-dismissed', 'true');
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-deep-forest/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-sand overflow-hidden shadow-tactile grain"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleDismiss}
              className="absolute top-6 right-6 text-deep-forest/40 hover:text-deep-forest transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="hidden md:block">
                <img 
                  src="https://picsum.photos/seed/newsletter-miro/600/800" 
                  alt="Miro Kloosterman" 
                  className="w-full h-full object-cover grayscale opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <span className="label !text-gold mb-4">The Journal</span>
                <h2 className="text-deep-forest text-3xl mb-6 font-display">Notes on Silence.</h2>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8"
                  >
                    <p className="text-sage font-body text-sm font-bold uppercase tracking-widest">Thank you.</p>
                    <p className="text-charcoal/60 text-sm font-light mt-2 italic">You are now on the list.</p>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-charcoal/60 text-sm font-light leading-relaxed mb-10">
                      Occasionally, I send out notes on breath, silence, and the integration of nine modalities. No noise, just substance.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input 
                          type="email" 
                          placeholder="Your Email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b border-deep-forest/20 py-3 text-sm font-light outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="btn-primary !w-full !px-0 !py-4 shadow-none"
                      >
                        Subscribe
                      </button>
                    </form>
                    
                    <p className="text-[9px] uppercase tracking-[1px] text-charcoal/30 mt-8 text-center">
                      Respecting your space. Unsubscribe anytime.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
