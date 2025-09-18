# Essential Goods Price Tracker

A bilingual (English-Khmer) web application for tracking and comparing essential goods prices across markets in Southeast Asia, particularly Cambodia.

## Project Overview

This application helps citizens monitor and compare prices of essential daily goods like rice, fish, vegetables, and cooking oil across multiple local markets. It features:

- **Price Overview**: Display current prices with color-coded highlights
- **Market Comparison**: Compare prices across different markets
- **Price Trends**: Historical price visualization with charts
- **Admin Panel**: CRUD operations for managing items and prices
- **Bilingual Support**: English and Khmer language toggle

## Technology Stack

### Frontend
- React.js 18
- React Router for navigation
- TailwindCSS for styling
- Chart.js for data visualization
- i18next for internationalization
- Axios for API calls

### Backend
- Node.js
- Express.js
- CORS enabled for cross-origin requests
- In-memory JSON data storage

## Phase 2 Implementation Status

✅ **Phase 1 Completed:**
- Project structure setup
- Backend API with full CRUD endpoints
- Comprehensive mock data (5 markets, 10 items each)
- React frontend with routing
- Bilingual support (English-Khmer)
- Home page with price overview table
- Color-coded price highlighting
- Search functionality
- Responsive design

✅ **Phase 2 Completed:**
- Market Comparison page with side-by-side price comparison
- Interactive Price Trends page with Chart.js visualization
- Full Admin Panel with CRUD operations
- Form validation and error handling
- Success/error notifications
- Chart.js integration for data visualization
- Complete CRUD workflow with real-time updates
- Professional UI with loading states and error handling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install all project dependencies:**
   ```bash
   npm run install-all
   ```

### Running the Application

1. **Start both frontend and backend:**
   ```bash
   npm run dev
   ```

2. **Or run separately:**
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

- `GET /api/markets` - Retrieve all markets and items
- `POST /api/market/:id/item` - Add new item to market
- `PUT /api/market/:id/item/:itemId` - Update item
- `DELETE /api/market/:id/item/:itemId` - Delete item
- `GET /api/health` - Health check

## Mock Data Structure

The application includes comprehensive mock data with:
- 5 markets (Central Market, Orussey Market, Russian Market, Phsar Thmei, Boeung Keng Kang Market)
- 10 essential items per market (Rice, Fish, Cooking Oil, Chicken, Pork, Eggs, Onions, Garlic, Tomatoes, Salt)
- Prices in Cambodian Riel (KHR)
- Bilingual names for all items and markets

## Features Implemented

### Home Page
- Displays all items with prices across markets
- Color-coded pricing (green for lowest, red for highest)
- Search functionality
- Bilingual display
- Responsive design
- Summary statistics

### Market Comparison Page
- Side-by-side price comparison across multiple markets
- Market and item selection with checkboxes
- Color-coded pricing (green for lowest, red for highest)
- Sorting by name or price (ascending/descending)
- Real-time data updates
- Bilingual support

### Price Trends Page
- Interactive line charts using Chart.js
- Historical data simulation (7-14 days)
- Multiple market comparison on same chart
- Item selection dropdown
- Market selection checkboxes
- Hover tooltips with exact prices and dates
- Responsive chart design

### Admin Panel
- Complete CRUD operations (Create, Read, Update, Delete)
- Add new items with bilingual names
- Edit existing items with form validation
- Delete items with confirmation prompts
- Real-time success/error notifications
- Form validation with error messages
- Market-specific item management

### Navigation & UX
- Clean navigation bar with all pages
- Language toggle button (English ↔ Khmer)
- Mobile-responsive design
- Loading states and error handling
- Professional UI with consistent styling

### Backend
- Complete REST API with all CRUD endpoints
- Input validation and error handling
- CORS configuration
- In-memory data storage for demo

## Development Notes

- The application uses in-memory data storage for demo purposes
- All text is internationalized using i18next
- TailwindCSS provides consistent styling
- The design is desktop-first with mobile responsiveness
- Color coding helps users quickly identify best prices

## Demo Walkthrough

1. Navigate to the Home page to see the price overview
2. Use the search bar to filter items
3. Notice the color-coded prices (green = lowest, red = highest)
4. Toggle between English and Khmer languages
5. Navigate between different pages using the menu

## Contributing

This is a school project demonstrating full-stack development with React and Node.js, focusing on practical applications for Southeast Asian markets.
