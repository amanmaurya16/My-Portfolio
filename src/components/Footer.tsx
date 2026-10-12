import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Lock, ShieldCheck } from 'lucide-react';
import { ContactInfo, VisitorUser } from '../types';

interface FooterProps {
  contact: ContactInfo;
  name?: string;
  brandTitle?: string;
  title?: string;
  isAdmin?: boolean;
  visitorUser?: VisitorUser | null;
  onOpenLogin: () => void;
  onOpenDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contact,
  name = 'Aman Maurya',
  brandTitle = 'MECHANICAL DESIGN PORTFOLIO',
  title = 'Mechanical Design Engineer',
  isAdmin,
  visitorUser,
  onOpenLogin,
  onOpenDashboard,
}) => {
  return (
    <footer className="bg-slate-900 text-white pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & gears */}
          <div className="lg:col-span-5 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl shadow-md flex items-center justify-center relative overflow-hidden shrink-0">
                <div className="flex items-center justify-center gap-[2px]">
                  <i className="fas fa-cog text-xs animate-[spin_2s_linear_infinite]" />
                  <i className="fas fa-cog text-[9px] animate-[spin_1.5s_linear_infinite_reverse]" />
                  <i className="fas fa-cog text-xs animate-[spin_2s_linear_infinite]" />
                </div>
              </div>
              <div className="whitespace-nowrap">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight uppercase whitespace-nowrap">
                  {brandTitle}
                </h3>
                <p className="text-xs text-blue-400 font-semibold leading-tight whitespace-nowrap mt-1">
                  {title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              {contact.instagramUrl && (
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {contact.linkedinUrl && (
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Contact</h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2.5 hover:text-blue-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{contact.phoneDisplay || contact.phone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 hover:text-blue-300 transition-colors truncate"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">{contact.email}</span>
              </a>
            </div>
          </div>

          {/* Location & Admin Entry */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Location</h4>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.location)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 hover:text-blue-300 transition-colors"
            >
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{contact.location}</span>
            </a>

            {isAdmin && onOpenDashboard && (
              <div className="pt-2">
                <button
                  onClick={onOpenDashboard}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  id="footer-open-cms-btn"
                >
                  <Lock className="w-3.5 h-3.5 text-white" />
                  <span>Open CMS Dashboard</span>
                </button>
              </div>
            )}

            {!isAdmin && (
              <div className="pt-2">
                <a
                  href="/admin.html"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors font-medium"
                  id="footer-admin-link"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Security Panel</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Mechanical Engineering &amp; CAD Design Portfolio</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
