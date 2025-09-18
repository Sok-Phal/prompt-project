import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Home = () => {
  const { t } = useTranslation();
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      const response = await axios.get('/api/markets');
      setMarkets(response.data.markets);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch market data');
      setLoading(false);
    }
  };

  // Flatten all items from all markets for display
  const allItems = markets.flatMap(market => 
    market.items.map(item => ({
      ...item,
      marketName: market.name_en,
      marketNameKm: market.name_km,
      marketId: market.id
    }))
  );

  // Filter items based on search term
  const filteredItems = allItems.filter(item =>
    item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name_km.includes(searchTerm)
  );

  // Group items by name to find min/max prices
  const itemGroups = filteredItems.reduce((groups, item) => {
    const key = item.name_en;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});

  // Calculate min and max prices for each item group
  const itemsWithPriceInfo = Object.values(itemGroups).map(items => {
    const prices = items.map(item => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return items.map(item => ({
      ...item,
      isMinPrice: item.price === minPrice,
      isMaxPrice: item.price === maxPrice
    }));
  }).flat();

  const getPriceColor = (item) => {
    if (item.isMinPrice) return 'text-green-600 font-semibold';
    if (item.isMaxPrice) return 'text-red-600 font-semibold';
    return 'text-gray-700';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price) + ' KHR';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 text-lg">{error}</div>
        <button 
          onClick={fetchMarkets}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('priceOverview')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('essentialGoods')} - {t('currentPrices')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto animate-slide-in">
        <div className="relative">
          <input
            type="text"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 pr-4 py-3 text-lg shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
          <span className="text-green-700 font-medium">{t('lowestPrice')}</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
          <span className="text-red-700 font-medium">{t('highestPrice')}</span>
        </div>
      </div>

      {/* Price Table */}
      <div className="card card-hover animate-fade-in">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('item')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('market')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('price')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itemsWithPriceInfo.map((item, index) => (
                <tr key={`${item.marketId}-${item.id}`} className="table-row-hover animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name_en}
                    </div>
                    <div className="text-sm text-gray-500 khmer-text">
                      {item.name_km}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.marketName}
                    </div>
                    <div className="text-sm text-gray-500 khmer-text">
                      {item.marketNameKm}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getPriceColor(item)}`}>
                        {formatPrice(item.price)}
                      </span>
                      {item.isMinPrice && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse-slow">
                          Best
                        </span>
                      )}
                      {item.isMaxPrice && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse-slow">
                          Highest
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card card-hover animate-fade-in">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{markets.length}</div>
            <div className="text-sm text-gray-500 font-medium">{t('market')}s</div>
          </div>
        </div>
        <div className="card card-hover animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {Object.keys(itemGroups).length}
            </div>
            <div className="text-sm text-gray-500 font-medium">{t('item')}s</div>
          </div>
        </div>
        <div className="card card-hover animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {allItems.length}
            </div>
            <div className="text-sm text-gray-500 font-medium">Total Entries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

