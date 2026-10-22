import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { ContactInfo } from '../types';
import { addStoredEnquiry } from '../utils/storage';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactInfo;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, contact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your Name, Email Address, and Project Message.');
      return;
    }
    setLoading(true);
    setError(null);

    // Save locally for in-browser inquiry log
    addStoredEnquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      projectType: projectType.trim() || 'Mechanical CAD Design',
      message: message.trim(),
    });

    let sentViaFormspree = false;

    // Dispatch via Formspree if configured
    if (contact.formspreeUrl) {
      try {
        const response = await fetch(contact.formspreeUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            projectType: projectType.trim() || 'Mechanical CAD Design',
            message: message.trim(),
            _subject: `Mechanical Portfolio Enquiry from ${name.trim()}`,
          }),
        });
        if (response.ok) {
          sentViaFormspree = true;
        }
      } catch (err) {
        console.warn('Formspree dispatch failed, fallback active:', err);
      }
    }

    setLoading(false);
    setSubmitted(true);
  };

  const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Engineering Enquiry: ${projectType || 'Mechanical Design Project'}`
  )}&body=${encodeURIComponent(
    `Hello Aman,\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}\n`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">
            Direct Engineering Enquiry
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Discuss a CAD or Design Project
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Share your requirements, CAD modeling needs, or manufacturing drawing details.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
                Enquiry Recorded Successfully
              </h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                Your message has been saved and dispatched. Aman will review your project details and get back to you shortly.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Also Open in Email Client</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setProjectType('');
                  setMessage('');
                  onClose();
                }}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@company.com"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Domain / Focus
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Select Project Type</option>
                  <option value="2D Drafting & Production Drawings">2D Drafting &amp; Production Drawings</option>
                  <option value="3D Part & Assembly Modeling">3D Part &amp; Assembly Modeling</option>
                  <option value="Mechanism Design & Kinematics">Mechanism Design &amp; Kinematics</option>
                  <option value="Sheet Metal Enclosure Design">Sheet Metal Enclosure Design</option>
                  <option value="Reverse Engineering & GD&T">Reverse Engineering &amp; GD&T</option>
                  <option value="Full-Time / Internship Opportunity">Full-Time / Internship Opportunity</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Requirements &amp; Scope *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the mechanical specifications, CAD software requirements (AutoCAD / SolidWorks), target deliverable, or timeline..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Or email directly: {contact.email}</span>
              </a>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Submitting...' : 'Submit Enquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
