import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const MarketComparison = () => {
  const { t } = useTranslation();
  const [markets, setMarkets] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
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

  // Get all unique items across all markets
  const allItems = markets.reduce((items, market) => {
    market.items.forEach(item => {
      if (!items.find(i => i.name_en === item.name_en)) {
        items.push({
          id: item.id,
          name_en: item.name_en,
          name_km: item.name_km
        });
      }
    });
    return items;
  }, []);

  // Handle market selection
  const handleMarketToggle = (marketId) => {
    setSelectedMarkets(prev => 
      prev.includes(marketId) 
        ? prev.filter(id => id !== marketId)
        : [...prev, marketId]
    );
  };

  // Handle item selection
  const handleItemToggle = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Get comparison data
  const getComparisonData = () => {
    if (selectedMarkets.length === 0 || selectedItems.length === 0) return [];

    const selectedMarketsData = markets.filter(market => 
      selectedMarkets.includes(market.id)
    );

    return selectedItems.map(itemId => {
      const item = allItems.find(i => i.id === itemId);
      if (!item) return null;

      const prices = selectedMarketsData.map(market => {
        const marketItem = market.items.find(i => i.name_en === item.name_en);
        return {
          marketId: market.id,
          marketName: market.name_en,
          marketNameKm: market.name_km,
          price: marketItem ? marketItem.price : null,
          available: !!marketItem
        };
      });

      const availablePrices = prices.filter(p => p.available).map(p => p.price);
      const minPrice = availablePrices.length > 0 ? Math.min(...availablePrices) : null;
      const maxPrice = availablePrices.length > 0 ? Math.max(...availablePrices) : null;

      return {
        item,
        prices: prices.map(p => ({
          ...p,
          isMinPrice: p.price === minPrice,
          isMaxPrice: p.price === maxPrice
        }))
      };
    }).filter(Boolean);
  };

  // Sort comparison data
  const getSortedData = () => {
    const data = getComparisonData();
    
    return data.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = a.item.name_en.toLowerCase();
        const nameB = b.item.name_en.toLowerCase();
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else if (sortBy === 'price') {
        const avgPriceA = a.prices.filter(p => p.available).reduce((sum, p) => sum + p.price, 0) / a.prices.filter(p => p.available).length;
        const avgPriceB = b.prices.filter(p => p.available).reduce((sum, p) => sum + p.price, 0) / b.prices.filter(p => p.available).length;
        return sortOrder === 'asc' ? avgPriceA - avgPriceB : avgPriceB - avgPriceA;
      }
      return 0;
    });
  };

  const formatPrice = (price) => {
    return price ? new Intl.NumberFormat('en-US').format(price) + ' KHR' : 'N/A';
  };

  const getPriceColor = (priceData) => {
    if (!priceData.available) return 'text-gray-400';
    if (priceData.isMinPrice) return 'text-green-600 font-semibold';
    if (priceData.isMaxPrice) return 'text-red-600 font-semibold';
    return 'text-gray-700';
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

  const comparisonData = getSortedData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('marketComparison')}
        </h1>
        <p className="text-gray-600">
          {t('comparePrices')}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('selectMarkets')}
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {markets.map(market => (
                <label key={market.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedMarkets.includes(market.id)}
                    onChange={() => handleMarketToggle(market.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {market.name_en}
                  </span>
                  <span className="ml-1 text-sm text-gray-500 khmer-text">
                    ({market.name_km})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Item Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('selectItems')}
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allItems.map(item => (
                <label key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemToggle(item.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {item.name_en}
                  </span>
                  <span className="ml-1 text-sm text-gray-500 khmer-text">
                    ({item.name_km})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              {t('sortBy')}:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
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
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded mr-2"></div>
          <span className="text-gray-700 font-medium">Not Available</span>
        </div>
      </div>

      {/* Comparison Table */}
      {comparisonData.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('item')}
                  </th>
                  {selectedMarkets.map(marketId => {
                    const market = markets.find(m => m.id === marketId);
                    return (
                      <th key={marketId} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {market.name_en}
                        <div className="text-xs text-gray-400 khmer-text">
                          {market.name_km}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comparisonData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {data.item.name_en}
                      </div>
                      <div className="text-sm text-gray-500 khmer-text">
                        {data.item.name_km}
                      </div>
                    </td>
                    {data.prices.map((priceData, priceIndex) => (
                      <td key={priceIndex} className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${getPriceColor(priceData)}`}>
                          {formatPrice(priceData.price)}
                        </div>
                        {priceData.isMinPrice && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Best
                          </span>
                        )}
                        {priceData.isMaxPrice && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Highest
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 text-lg">
            {selectedMarkets.length === 0 
              ? 'Please select at least one market to compare'
              : selectedItems.length === 0 
                ? 'Please select at least one item to compare'
                : 'No data available for selected markets and items'
            }
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {comparisonData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{selectedMarkets.length}</div>
              <div className="text-sm text-gray-500">Markets Selected</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{selectedItems.length}</div>
              <div className="text-sm text-gray-500">Items Selected</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{comparisonData.length}</div>
              <div className="text-sm text-gray-500">Comparisons</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketComparison;
