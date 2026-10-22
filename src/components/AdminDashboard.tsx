import React from 'react';
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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-fadeIn"
      role="dialog"
      aria-modal="true"
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
