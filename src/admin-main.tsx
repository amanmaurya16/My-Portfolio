import React from 'react';
import { createRoot } from 'react-dom/client';
import { AdminApp } from './AdminApp';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

const container = document.getElementById('admin-root');
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <ErrorBoundary fallbackTitle="Admin Studio Interruption">
        <AdminApp />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
