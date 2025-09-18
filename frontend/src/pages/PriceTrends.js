import React, { useState, useEffect } from 'react'; 
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceTrends = () => {
  const { t } = useTranslation();
  const [markets, setMarkets] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [timeRange, setTimeRange] = useState('7');
  const [loading, setLoading] = useState(true);
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

  // Generate mock historical data for the selected item
  const generateHistoricalData = (itemName, marketIds, days) => {
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayData = {
        date: dateStr,
        prices: {}
      };

      marketIds.forEach(marketId => {
        const market = markets.find(m => m.id === marketId);
        if (market) {
          const item = market.items.find(i => i.name_en === itemName);
          if (item) {
            // Generate realistic price variations (±10% from base price)
            const basePrice = item.price;
            const variation = (Math.random() - 0.5) * 0.2; // ±10%
            const price = Math.round(basePrice * (1 + variation));
            dayData.prices[marketId] = {
              price,
              marketName: market.name_en,
              marketNameKm: market.name_km
            };
          }
        }
      });

      data.push(dayData);
    }

    return data;
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

  // Handle market selection for trends
  const handleMarketToggle = (marketId) => {
    setSelectedMarkets(prev => 
      prev.includes(marketId) 
        ? prev.filter(id => id !== marketId)
        : [...prev, marketId]
    );
  };

  // Prepare chart data
  const getChartData = () => {
    if (!selectedItem || selectedMarkets.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    const historicalData = generateHistoricalData(selectedItem, selectedMarkets, parseInt(timeRange));
    const labels = historicalData.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const datasets = selectedMarkets.map(marketId => {
      const market = markets.find(m => m.id === marketId);
      const data = historicalData.map(d => d.prices[marketId]?.price || null);
      
      // Generate a unique color for each market
      const colors = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
        '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
      ];
      const colorIndex = marketId % colors.length;
      
      return {
        label: market.name_en,
        data: data,
        borderColor: colors[colorIndex],
        backgroundColor: colors[colorIndex] + '20',
        tension: 0.1,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      };
    });

    return {
      labels,
      datasets
    };
  };

  const chartData = getChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: selectedItem ? `${selectedItem} - ${t('priceTrends')}` : t('priceTrends'),
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            const market = markets.find(m => m.id === selectedMarkets[context.datasetIndex]);
            return `${market.name_en}: ${new Intl.NumberFormat('en-US').format(context.parsed.y)} KHR`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price (KHR)'
        },
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('en-US').format(value);
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
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
          {t('priceTrends')}
        </h1>
        <p className="text-gray-600">
          {t('historicalData')}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Item Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('selectItem')}
            </label>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t('selectItem')}</option>
              {allItems.map(item => (
                <option key={item.id} value={item.name_en}>
                  {item.name_en} ({item.name_km})
                </option>
              ))}
            </select>
          </div>

          {/* Market Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('selectMarkets')}
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
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
                </label>
              ))}
            </div>
          </div>

          {/* Time Range Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Range
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">{t('last7Days')}</option>
              <option value="14">{t('last14Days')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      {selectedItem && selectedMarkets.length > 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-96">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 text-lg">
            {!selectedItem 
              ? 'Please select an item to view price trends'
              : selectedMarkets.length === 0 
                ? 'Please select at least one market to compare'
                : 'No data available for selected item and markets'
            }
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {selectedItem && selectedMarkets.length > 0 && chartData.datasets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{selectedMarkets.length}</div>
              <div className="text-sm text-gray-500">Markets</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{timeRange}</div>
              <div className="text-sm text-gray-500">Days</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {chartData.labels.length}
              </div>
              <div className="text-sm text-gray-500">Data Points</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {selectedItem}
              </div>
              <div className="text-sm text-gray-500">Selected Item</div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">How to use Price Trends:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Select an item from the dropdown to view its price history</li>
          <li>• Choose one or more markets to compare price trends</li>
          <li>• Use the time range selector to view 7 or 14 days of data</li>
          <li>• Hover over data points to see exact prices and dates</li>
          <li>• Different colored lines represent different markets</li>
        </ul>
      </div>
    </div>
  );
};

export default PriceTrends;
