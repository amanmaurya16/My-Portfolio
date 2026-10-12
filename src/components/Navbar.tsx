import React, { useState } from 'react';
import {
  Home,
  User,
  Grid,
  FileText,
  Mail,
  Send,
  Phone,
  Lock,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLogin: () => void;
  onOpenContact: () => void;
  onOpenEnquiry: () => void;
  onToggleDashboard?: () => void;
  brandSubtitle?: string;
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenLogin,
  onOpenContact,
  onOpenEnquiry,
  onToggleDashboard,
  brandSubtitle = 'MECHANICAL DESIGN PORTFOLIO',
  title = 'Mechanical Design Engineer',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOutUser } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About me', icon: User },
    { id: 'gallery', label: 'Design Gallery', icon: Grid },
    { id: 'resume', label: 'Resume', icon: FileText },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group min-w-0 mr-3 shrink-0"
          id="nav-logo-link"
        >
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl shadow-md flex items-center justify-center relative overflow-hidden group-hover:bg-blue-700 transition-colors shrink-0">
            <div className="flex items-center justify-center gap-[2px]">
              <i className="fas fa-cog text-xs animate-[spin_2s_linear_infinite]" />
              <i className="fas fa-cog text-[9px] animate-[spin_1.5s_linear_infinite_reverse]" />
              <i className="fas fa-cog text-xs animate-[spin_2s_linear_infinite]" />
            </div>
          </div>
          <div className="min-w-0 flex-1 sm:flex-initial">
            <h1 className="text-xs sm:text-sm lg:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight sm:tracking-wide leading-tight group-hover:text-blue-600 transition-colors uppercase truncate max-w-[180px] xs:max-w-[240px] md:max-w-[260px] lg:max-w-none">
              {brandSubtitle}
            </h1>
            <p className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold leading-tight truncate max-w-[180px] xs:max-w-[240px] md:max-w-[260px] lg:max-w-none">
              {title}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-2.5 py-1.5 lg:px-3.5 lg:py-2 text-xs lg:text-sm font-semibold transition-all rounded-lg cursor-pointer whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}

          {/* Action Buttons */}
          <button
            onClick={onOpenContact}
            className="px-2.5 py-1.5 lg:px-3.5 lg:py-2 text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            id="nav-btn-contact"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Contact</span>
          </button>

          <button
            onClick={onOpenEnquiry}
            className="px-2.5 py-1.5 lg:px-3.5 lg:py-2 text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            id="nav-btn-enquiry"
          >
            <Send className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Enquiry</span>
          </button>

          {/* User / Admin Authentication display */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              {isAdmin ? (
                <div className="flex items-center gap-1.5">
                  {onToggleDashboard && (
                    <button
                      onClick={onToggleDashboard}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                      id="navbar-admin-cms-btn"
                    >
                      <Lock className="w-3 h-3" />
                      <span>CMS Panel</span>
                    </button>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Admin</span>
                  </span>
                </div>
              ) : (
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate max-w-[120px]">
                  {user.displayName || user.email}
                </span>
              )}
              <button
                onClick={signOutUser}
                title="Sign Out"
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                id="navbar-admin-logout-btn"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap ml-1"
              id="navbar-signin-btn"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </nav>

        {/* Mobile menu hamburger toggle */}
        <div className="md:hidden flex items-center gap-2">
          {user && isAdmin && onToggleDashboard && (
            <button
              onClick={onToggleDashboard}
              className="px-2 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-lg"
            >
              CMS
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            id="mobile-menu-toggle-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 shadow-lg"
          id="mobile-nav-drawer-menu"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-3 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
              id="mobile-drawer-contact-btn"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Contact</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
              id="mobile-drawer-enquiry-btn"
            >
              <Send className="w-4 h-4 text-blue-600" />
              <span>Enquiry</span>
            </button>
          </div>

          <div className="pt-2">
            {user ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {user.displayName || user.email}
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {isAdmin ? 'Authenticated Admin' : 'Visitor'}
                  </p>
                </div>
                <button
                  onClick={signOutUser}
                  className="px-3 py-1.5 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold rounded-lg"
                  id="mobile-auth-logout-btn"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                id="mobile-drawer-signin-btn"
              >
                <Lock className="w-4 h-4" />
                <span>Admin / Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
