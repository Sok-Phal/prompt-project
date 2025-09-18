import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('adminPanel')}
        </h1>
        <p className="text-gray-600">
          {t('manageItems')}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-500 text-lg">
          Admin Panel - Coming in Phase 2
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
