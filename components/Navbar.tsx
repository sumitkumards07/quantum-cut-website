import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Q Logo Component
const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
    <path d="M30 15 L70 15 L90 50 L70 85 L30 85 L10 50 Z" stroke="#00ccff" strokeWidth="6" fill="none" />
    <path d="M55 55 L85 85" stroke="#00ccff" strokeWidth="8" strokeLinecap="round" />
    <path d="M25 40 L35 40" stroke="#ffffff" strokeWidth="4" />
    <path d="M25 50 L45 50" stroke="#ffffff" strokeWidth="4" />
    <circle cx="50" cy="50" r="5" fill="#ffffff" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center group">
          <Logo />
          <span className="text-2xl font-display font-bold tracking-tighter group-hover:text-brand-500 transition-colors">
            QUANTUM <span className="text-brand-500">CUT</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6 mr-6 border-r border-white/10 pr-6">
            <a href="mailto:sumitkumards07@gmail.com" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">
              sumitkumards07@gmail.com
            </a>
            <a href="tel:+918950013181" className="text-sm text-gray-400 hover:text-brand-500 transition-colors font-semibold">
              +91 8950013181
            </a>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full" />
            </a>
          ))}
          <a
            href="#pricing"
            className="px-5 py-2 text-sm font-semibold bg-white text-black hover:bg-brand-500 hover:text-white transition-all duration-300 rounded-sm"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-display font-bold text-gray-300 hover:text-brand-500 hover:pl-4 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col space-y-4">
                <a href="mailto:sumitkumards07@gmail.com" className="text-gray-400">sumitkumards07@gmail.com</a>
                <a href="tel:+918950013181" className="text-white font-semibold">+91 8950013181</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;