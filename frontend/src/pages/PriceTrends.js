import React from 'react';
import { useTranslation } from 'react-i18next';

const PriceTrends = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('priceTrends')}
        </h1>
        <p className="text-gray-600">
          {t('historicalData')}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-500 text-lg">
          Price Trends page - Coming in Phase 2
        </div>
      </div>
    </div>
  );
};

export default PriceTrends;
