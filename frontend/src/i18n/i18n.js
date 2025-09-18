import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      comparison: "Market Comparison",
      trends: "Price Trends",
      admin: "Admin Panel",
      
      // Common
      item: "Item",
      market: "Market",
      price: "Price",
      action: "Action",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      save: "Save",
      cancel: "Cancel",
      search: "Search",
      language: "Language",
      
      // Home page
      priceOverview: "Price Overview",
      essentialGoods: "Essential Goods",
      currentPrices: "Current Prices",
      lowestPrice: "Lowest Price",
      highestPrice: "Highest Price",
      
      // Market Comparison
      marketComparison: "Market Comparison",
      comparePrices: "Compare Prices Across Markets",
      selectMarkets: "Select Markets",
      selectItems: "Select Items",
      sortBy: "Sort By",
      priceAsc: "Price (Low to High)",
      priceDesc: "Price (High to Low)",
      
      // Price Trends
      priceTrends: "Price Trends",
      historicalData: "Historical Price Data",
      selectItem: "Select Item",
      last7Days: "Last 7 Days",
      last14Days: "Last 14 Days",
      
      // Admin Panel
      adminPanel: "Admin Panel",
      manageItems: "Manage Items",
      addNewItem: "Add New Item",
      itemName: "Item Name",
      itemNameKhmer: "Item Name (Khmer)",
      itemPrice: "Price (KHR)",
      selectMarket: "Select Market",
      confirmDelete: "Are you sure you want to delete this item?",
      itemAdded: "Item added successfully!",
      itemUpdated: "Item updated successfully!",
      itemDeleted: "Item deleted successfully!",
      errorOccurred: "An error occurred. Please try again.",
      
      // Validation
      nameRequired: "Item name is required",
      priceRequired: "Price is required",
      priceNumeric: "Price must be a number",
      marketRequired: "Please select a market",
      
      // Footer
      footer: "Essential Goods Price Tracker - Helping citizens make informed decisions"
    }
  },
  km: {
    translation: {
      // Navigation
      home: "ទំព័រដើម",
      comparison: "ប្រៀបធៀបផ្សារ",
      trends: "វិបាកតម្លៃ",
      admin: "ផ្ទាំងគ្រប់គ្រង",
      
      // Common
      item: "ទំនិញ",
      market: "ផ្សារ",
      price: "តម្លៃ",
      action: "សកម្មភាព",
      edit: "កែសម្រួល",
      delete: "លុប",
      add: "បន្ថែម",
      save: "រក្សាទុក",
      cancel: "បោះបង់",
      search: "ស្វែងរក",
      language: "ភាសា",
      
      // Home page
      priceOverview: "ទិដ្ឋភាពតម្លៃ",
      essentialGoods: "ទំនិញចាំបាច់",
      currentPrices: "តម្លៃបច្ចុប្បន្ន",
      lowestPrice: "តម្លៃទាបបំផុត",
      highestPrice: "តម្លៃខ្ពស់បំផុត",
      
      // Market Comparison
      marketComparison: "ប្រៀបធៀបផ្សារ",
      comparePrices: "ប្រៀបធៀបតម្លៃទូទាំងផ្សារ",
      selectMarkets: "ជ្រើសរើសផ្សារ",
      selectItems: "ជ្រើសរើសទំនិញ",
      sortBy: "តម្រៀបតាម",
      priceAsc: "តម្លៃ (ទាបទៅខ្ពស់)",
      priceDesc: "តម្លៃ (ខ្ពស់ទៅទាប)",
      
      // Price Trends
      priceTrends: "វិបាកតម្លៃ",
      historicalData: "ទិន្នន័យតម្លៃប្រវត្តិ",
      selectItem: "ជ្រើសរើសទំនិញ",
      last7Days: "៧ថ្ងៃកន្លងមក",
      last14Days: "១៤ថ្ងៃកន្លងមក",
      
      // Admin Panel
      adminPanel: "ផ្ទាំងគ្រប់គ្រង",
      manageItems: "គ្រប់គ្រងទំនិញ",
      addNewItem: "បន្ថែមទំនិញថ្មី",
      itemName: "ឈ្មោះទំនិញ",
      itemNameKhmer: "ឈ្មោះទំនិញ (ខ្មែរ)",
      itemPrice: "តម្លៃ (រៀល)",
      selectMarket: "ជ្រើសរើសផ្សារ",
      confirmDelete: "តើអ្នកប្រាកដថាចង់លុបទំនិញនេះមែនទេ?",
      itemAdded: "បានបន្ថែមទំនិញដោយជោគជ័យ!",
      itemUpdated: "បានកែសម្រួលទំនិញដោយជោគជ័យ!",
      itemDeleted: "បានលុបទំនិញដោយជោគជ័យ!",
      errorOccurred: "មានកំហុសកើតឡើង។ សូមព្យាយាមម្តងទៀត។",
      
      // Validation
      nameRequired: "ឈ្មោះទំនិញចាំបាច់",
      priceRequired: "តម្លៃចាំបាច់",
      priceNumeric: "តម្លៃត្រូវតែជាលេខ",
      marketRequired: "សូមជ្រើសរើសផ្សារ",
      
      // Footer
      footer: "កម្មវិធីតាមដានតម្លៃទំនិញចាំបាច់ - ជួយពលរដ្ឋធ្វើការសម្រេចចិត្តដោយចេះដឹង"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
