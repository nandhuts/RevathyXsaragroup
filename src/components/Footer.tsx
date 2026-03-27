import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue-dark text-white pt-16 pb-8 border-t border-brand-blue-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Intro */}
          <div>
            <Link href="/" className="mb-6 block">
              <span className="text-2xl font-bold text-white">
                Revathy <span className="text-brand-gold">Xsara</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              A growing local business brand with a strong community presence. We bring premium experiences, quality services, and convenience together under one unified group.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-brand-gold transition-colors block text-sm">Home</Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-brand-gold transition-colors block text-sm">About Group</Link>
              </li>
              <li>
                <Link href="#businesses" className="text-gray-400 hover:text-brand-gold transition-colors block text-sm">Our Businesses</Link>
              </li>
              <li>
                <Link href="#achievements" className="text-gray-400 hover:text-brand-gold transition-colors block text-sm">Achievements</Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-brand-gold transition-colors block text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Our Businesses */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Our Businesses</h3>
            <ul className="space-y-4">
              <li className="text-gray-400 text-sm">Revathy Cinemax</li>
              <li className="text-gray-400 text-sm">Revathy Xsara Conventional Center</li>
              <li className="text-gray-400 text-sm">Revathy Xsara Hypermarket</li>
              <li className="text-gray-400 text-sm">Revathy Tyres and Services</li>
              <li className="text-gray-400 text-sm">Revathy Fuels</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 text-sm">
                <MapPin className="w-5 h-5 mr-3 text-brand-gold flex-shrink-0" />
                <span>Revathy Xsara Group, Main Hub, Kerala, India</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone className="w-5 h-5 mr-3 text-brand-gold flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="w-5 h-5 mr-3 text-brand-gold flex-shrink-0" />
                <span>info@revathyxsaragroup.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-blue-light flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {currentYear} Revathy Xsara Private Limited. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-500">
            <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
