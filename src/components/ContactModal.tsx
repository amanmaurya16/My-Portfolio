import React from 'react';
import { X, Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import { ContactInfo } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactInfo;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, contact }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Icon & Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
            <Phone className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Get in Touch
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Have an engineering project or want to collaborate? Reach out anytime!
            </p>
          </div>
        </div>

        {/* Contact Cards List */}
        <div className="space-y-3">
          {/* Phone */}
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Phone</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition">
                {contact.phoneDisplay || contact.phone}
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Email</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition">
                {contact.email}
              </p>
            </div>
          </a>

          {/* Location */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(contact.location)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Location</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition">
                {contact.location}
              </p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={contact.linkedinUrl || 'https://www.linkedin.com/'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
              <Linkedin className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">LinkedIn</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition">
                Connect on LinkedIn
              </p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={contact.instagramUrl || 'https://www.instagram.com/'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Instagram</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition">
                Follow on Instagram
              </p>
            </div>
          </a>
        </div>

        {/* Footer Note */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Available for mechanical design, CAD modeling, and industrial drafting projects.
          </p>
        </div>
      </div>
    </div>
  );
};
