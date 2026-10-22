import React, { useState } from 'react';
import { PortfolioData, EnquiryItem } from './types';
import {
  loadCurrentPortfolioData,
  saveDraftPortfolioData,
  resetToCanonicalPortfolioData,
} from './services/portfolioRepository';
import {
  loadStoredEnquiries,
  deleteStoredEnquiry,
} from './utils/storage';
import { AdminPanel } from './components/admin/AdminPanel';

export const AdminApp: React.FC = () => {
  const [{ data }, setPortfolioState] = useState(() => loadCurrentPortfolioData());
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => loadStoredEnquiries());

  const handleUpdateData = (newData: PortfolioData) => {
    saveDraftPortfolioData(newData);
    setPortfolioState({ data: newData, isDraft: true });
  };

  const handleDeleteEnquiry = (id: string) => {
    const updated = deleteStoredEnquiry(id);
    setEnquiries(updated);
  };

  const handleResetData = () => {
    const canonical = resetToCanonicalPortfolioData();
    setPortfolioState({ data: canonical, isDraft: false });
  };

  return (
    <AdminPanel
      data={data}
      onUpdateData={handleUpdateData}
      onResetData={handleResetData}
      enquiries={enquiries}
      onDeleteEnquiry={handleDeleteEnquiry}
      isStandalone={true}
    />
  );
};
