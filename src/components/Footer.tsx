import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, ExternalLink, Sliders } from 'lucide-react';
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
  onOpenLogin,
  onOpenDashboard,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Identity & Mechanical Focus */}
          <div className="lg:col-span-5 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow">
                AM
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {name}
                </h3>
                <p className="text-xs text-blue-400 font-mono font-semibold uppercase tracking-wider">
                  {title}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Mechanical Engineering student at CIPET IPT Jaipur with practical experience in 2D AutoCAD drafting, SolidWorks 3D parametric part &amp; assembly modeling, GD&amp;T standards, and machine mechanisms.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {contact.linkedinUrl && (
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {contact.instagramUrl && (
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="w-9 h-9 bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Technical Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Engineering Focus
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>AutoCAD 2D Drafting &amp; Detailing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>SolidWorks 3D Part &amp; Assembly</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>ASME Y14.5 GD&amp;T Application</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Mechanism &amp; Linkage Kinematics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Sheet Metal &amp; Weldment Structures</span>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              {Boolean(contact.phone) && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2.5 hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>{contact.phoneDisplay || contact.phone}</span>
                </a>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 hover:text-blue-400 transition-colors truncate"
              >
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="truncate">{contact.email}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {currentYear} {name}. All mechanical drawings, CAD models, and technical portfolios reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Static Site on GitHub Pages</span>
            <span>•</span>
            <button
              onClick={isAdmin && onOpenDashboard ? onOpenDashboard : onOpenLogin}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
            >
              <Sliders className="w-3 h-3" />
              <span>{isAdmin ? 'CMS Dashboard' : 'Content Studio'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
