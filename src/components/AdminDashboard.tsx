import React, { useEffect } from 'react';
import { PortfolioData, EnquiryItem } from '../types';
import { AdminPanel } from './admin/AdminPanel';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
  enquiries: EnquiryItem[];
  onDeleteEnquiry: (id: string) => void;
  onResetData: () => void;
  onExportBackup?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  enquiries,
  onDeleteEnquiry,
  onResetData,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Studio CMS"
    >
      <AdminPanel
        data={data}
        onUpdateData={onUpdateData}
        onResetData={onResetData}
        enquiries={enquiries}
        onDeleteEnquiry={onDeleteEnquiry}
        onClose={onClose}
        isStandalone={false}
      />
    </div>
  );
};
