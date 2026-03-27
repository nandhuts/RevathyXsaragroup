"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Businesses', href: '#businesses' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-brand-blue/90 backdrop-blur-md border-b border-gray-200 dark:border-brand-blue-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-brand-blue dark:text-white">
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
                className="text-gray-700 dark:text-gray-300 hover:text-brand-gold dark:hover:text-brand-gold font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#contact"
              className="bg-brand-gold hover:bg-brand-gold-dark text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-brand-gold focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-brand-blue-dark border-b border-gray-200 dark:border-brand-blue-light">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-gold hover:bg-gray-50 dark:hover:bg-brand-blue-light rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-gold text-white px-6 py-3 rounded-full font-semibold"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
