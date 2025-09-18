import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const AdminPanel = () => {
  const { t } = useTranslation();
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name_en: '',
    name_km: '',
    price: '',
    marketId: ''
  });
  const [formErrors, setFormErrors] = useState({});

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

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name_en.trim()) {
      errors.name_en = t('nameRequired');
    }
    if (!formData.name_km.trim()) {
      errors.name_km = t('nameRequired');
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = t('priceNumeric');
    }
    if (!formData.marketId) {
      errors.marketId = t('marketRequired');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_km: '',
      price: '',
      marketId: ''
    });
    setFormErrors({});
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await axios.post(`/api/market/${formData.marketId}/item`, {
        name_en: formData.name_en.trim(),
        name_km: formData.name_km.trim(),
        price: parseFloat(formData.price)
      });

      showNotification(t('itemAdded'), 'success');
      resetForm();
      fetchMarkets(); // Refresh data
    } catch (err) {
      showNotification(err.response?.data?.error || t('errorOccurred'), 'error');
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await axios.put(`/api/market/${formData.marketId}/item/${editingItem.id}`, {
        name_en: formData.name_en.trim(),
        name_km: formData.name_km.trim(),
        price: parseFloat(formData.price)
      });

      showNotification(t('itemUpdated'), 'success');
      resetForm();
      fetchMarkets(); // Refresh data
    } catch (err) {
      showNotification(err.response?.data?.error || t('errorOccurred'), 'error');
    }
  };

  const handleDeleteItem = async (item, marketId) => {
    if (!window.confirm(t('confirmDelete'))) return;

    try {
      await axios.delete(`/api/market/${marketId}/item/${item.id}`);
      showNotification(t('itemDeleted'), 'success');
      fetchMarkets(); // Refresh data
    } catch (err) {
      showNotification(err.response?.data?.error || t('errorOccurred'), 'error');
    }
  };

  const startEdit = (item, marketId) => {
    setEditingItem(item);
    setFormData({
      name_en: item.name_en,
      name_km: item.name_km,
      price: item.price.toString(),
      marketId: marketId.toString()
    });
    setShowAddForm(true);
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
          {t('adminPanel')}
        </h1>
        <p className="text-gray-600">
          {t('manageItems')}
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingItem ? t('edit') : t('addNewItem')}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={editingItem ? handleEditItem : handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('itemName')} (English)
                </label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.name_en ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter item name in English"
                />
                {formErrors.name_en && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name_en}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('itemNameKhmer')}
                </label>
                <input
                  type="text"
                  name="name_km"
                  value={formData.name_km}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent khmer-text ${
                    formErrors.name_km ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="បញ្ចូលឈ្មោះទំនិញជាភាសាខ្មែរ"
                />
                {formErrors.name_km && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name_km}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('itemPrice')}
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter price in KHR"
                />
                {formErrors.price && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('selectMarket')}
                </label>
                <select
                  name="marketId"
                  value={formData.marketId}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.marketId ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('selectMarket')}</option>
                  {markets.map(market => (
                    <option key={market.id} value={market.id}>
                      {market.name_en} ({market.name_km})
                    </option>
                  ))}
                </select>
                {formErrors.marketId && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.marketId}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingItem ? t('save') : t('add')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Button */}
      {!showAddForm && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {t('addNewItem')}
          </button>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-6">
        {markets.map(market => (
          <div key={market.id} className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {market.name_en}
              </h3>
              <p className="text-sm text-gray-500 khmer-text">
                {market.name_km}
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('item')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('price')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('action')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {market.items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name_en}
                        </div>
                        <div className="text-sm text-gray-500 khmer-text">
                          {item.name_km}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEdit(item, market.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {t('edit')}
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item, market.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            {t('delete')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{markets.length}</div>
            <div className="text-sm text-gray-500">Markets</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {markets.reduce((total, market) => total + market.items.length, 0)}
            </div>
            <div className="text-sm text-gray-500">Total Items</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {markets.reduce((avg, market) => {
                const marketAvg = market.items.reduce((sum, item) => sum + item.price, 0) / market.items.length;
                return avg + marketAvg;
              }, 0) / markets.length || 0}
            </div>
            <div className="text-sm text-gray-500">Avg Price (KHR)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
