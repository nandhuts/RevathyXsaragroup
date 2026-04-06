"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Businesses', href: '#businesses' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-[#0a0f1a]/95 backdrop-blur-md border-b shadow-md dark:border-gray-800 border-gray-100 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className={`text-2xl font-bold transition-colors ${scrolled ? 'text-brand-blue-dark dark:text-white' : 'text-white'}`}>
                Revathy <span className="text-brand-gold">Xsara</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-all hover:text-brand-gold ${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-gray-200'}`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#contact"
              className="bg-brand-gold hover:bg-white hover:text-brand-blue-dark text-brand-blue-dark px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Enquiry
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none ${scrolled ? 'text-gray-700 dark:text-white' : 'text-white'}`}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full w-full bg-white dark:bg-brand-blue-dark border-b border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-brand-gold hover:bg-gray-50 dark:hover:bg-brand-blue-light rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-2">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-gold text-brand-blue-dark px-6 py-3.5 rounded-full font-bold text-lg shadow-md"
              >
                Enquiry
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
