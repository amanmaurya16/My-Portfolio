import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactInfo } from '../types';
import { submitEnquiryToFirestore } from '../utils/firebase';

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
    if (!name || !email || !message) {
      setError('Please fill in Full Name, Email Address, and Message.');
      return;
    }
    setLoading(true);
    setError(null);

    await submitEnquiryToFirestore({
      name,
      email,
      phone,
      projectType: projectType || 'General Inquiry',
      message,
    });

    if (contact.formspreeUrl) {
      try {
        await fetch(contact.formspreeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            subject: `Enquiry: ${projectType || 'General'}`,
            message,
          }),
        });
      } catch (err) {
        console.warn('Formspree dispatch notice:', err);
      }
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1.5 mb-6">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Send An Enquiry
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Have a project or requirement?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Share your details and requirements. I'll get back to you shortly.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
              Enquiry Submitted Successfully!
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Thank you for sharing your project details. Aman will reach out to you shortly.
            </p>
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
              className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Enquiry Type *
                </label>
                <select
                  required
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Select enquiry</option>
                  <option value="CAD Design">CAD Design</option>
                  <option value="Mechanism Design">Mechanism Design</option>
                  <option value="3D Modeling">3D Modeling</option>
                  <option value="Engineering Drafting">Engineering Drafting &amp; GD&amp;T</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, mechanism requirement, or timeline..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Sending...' : 'Send Enquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
