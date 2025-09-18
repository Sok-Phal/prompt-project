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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('priceOverview')}
        </h1>
        <p className="text-gray-600">
          {t('essentialGoods')} - {t('currentPrices')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('item')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('market')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('price')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itemsWithPriceInfo.map((item, index) => (
                <tr key={`${item.marketId}-${item.id}`} className="hover:bg-gray-50">
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
                    <span className={`text-sm ${getPriceColor(item)}`}>
                      {formatPrice(item.price)}
                    </span>
                    {item.isMinPrice && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Best
                      </span>
                    )}
                    {item.isMaxPrice && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Highest
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{markets.length}</div>
            <div className="text-sm text-gray-500">{t('market')}s</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(itemGroups).length}
            </div>
            <div className="text-sm text-gray-500">{t('item')}s</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {allItems.length}
            </div>
            <div className="text-sm text-gray-500">Total Entries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
