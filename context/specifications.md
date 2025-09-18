Absolutely ✅ Let’s produce a **fully precise, unambiguous, and complete specification** for the **Essential Goods Price Tracker**—covering all functional, technical, data, UX, and demo-related requirements in a clear, professional manner. I’ll leave **no room for confusion**.

---

# **Definitive Project Specifications: Essential Goods Price Tracker**

**Project Overview:**
A **desktop-first, bilingual web application (English–Khmer)** that allows citizens in Southeast Asia, particularly Cambodia, to **view, compare, and analyze prices of essential goods** across local markets. The application includes **item-level CRUD operations**, uses **mock JSON data**, and demonstrates clear, functional workflows suitable for a **2-week solo school assignment demo**.

---

## **1. Functional Specifications**

### **1.1 Home Page – Price Overview**

* **Purpose:** Display a complete list of essential goods with current prices for each market.
* **Table Structure:**

  * Columns: Item Name | Market Name | Price
  * Rows: One per item-market combination
* **Features:**

  * Color coding: cheapest price → green, most expensive → red
  * Search/filter by item name
  * Bilingual support (English ↔ Khmer) for all headers and item names
  * Hover tooltip shows additional info (optional: e.g., last updated date)
* **Constraints:**

  * Limit display to **3–5 markets** and **5–10 items per market** to ensure readability
* **User Actions:**

  * Toggle language manually via a visible button
  * Hover over prices to view tooltip

---

### **1.2 Market Comparison Page**

* **Purpose:** Compare prices of the same items across multiple markets side by side.
* **Table Structure:**

  * Rows: Items
  * Columns: Markets
  * Cells: Price for each item in the respective market
* **Features:**

  * Color coding: minimum price → green, maximum price → red
  * Dropdown filters to select items or markets
  * Sorting by price ascending/descending
  * Bilingual labels for columns, headers, and item names
* **Constraints:**

  * Maximum of 3–5 markets displayed simultaneously
* **User Actions:**

  * Select/deselect markets
  * Sort items by price

---

### **1.3 Price Trends Page**

* **Purpose:** Display historical price trends for selected goods.
* **Features:**

  * Interactive line chart per item (mock data)
  * Dropdown to select the item to display
  * Hover tooltip shows exact price and date
  * Chart labels, axes, legend are bilingual
* **Constraints:**

  * Mock data covers **7–14 days** for readability and demo simplicity
* **User Actions:**

  * Select item to update chart dynamically

---

### **1.4 Admin Panel – Item-Level CRUD**

* **Purpose:** Allow demonstration of Create, Read, Update, Delete functionality for items.
* **Features:**

  * Add new item to a market (input: item name, price)
  * Edit existing item (update name/price)
  * Delete item with confirmation prompt
  * Success/failure notification for each operation
  * Input validation:

    * Price must be numeric
    * Item names cannot be empty
    * Item names must be unique per market
* **Constraints:**

  * CRUD operations **only at item-level**, no market-level CRUD
  * Data is stored **in-memory** for demo purposes (optional persistence for extra credit)
* **User Actions:**

  * Add, edit, or delete items
  * Submit forms and receive feedback notifications

---

### **1.5 Language Toggle**

* **Purpose:** Make the application accessible to English and Khmer speakers.
* **Features:**

  * Manual toggle visible on all pages
  * Translates:

    * Table headers
    * Item and market names
    * Chart titles, axes, legend
    * Admin form labels and notifications
* **Constraints:** Must update the entire page instantly without reload

---

## **2. Technical Specifications**

### **2.1 Frontend**

* **Framework:** React.js
* **Routing:** React Router
* **Styling:** TailwindCSS (desktop-first)
* **Charts:** Chart.js or Recharts
* **Bilingual Support:** i18next
* **Forms:** React Hook Form or controlled components
* **Interactions:** Hover tooltips, sorting/filtering, language toggle

### **2.2 Backend**

* **Framework:** Node.js + Express.js
* **Endpoints:**

  * `GET /markets` → returns all markets and items
  * `POST /market/:id/item` → add a new item to a market
  * `PUT /market/:id/item/:itemId` → update item name/price
  * `DELETE /market/:id/item/:itemId` → delete item from a market
* **Data:** Mock JSON stored **in-memory**, structure consistent with frontend requirements

### **2.3 Mock Data Example**

```json
{
  "markets": [
    {
      "id": 1,
      "name_en": "Central Market",
      "name_km": "ផ្សារធំថ្មី",
      "items": [
        { "id": 1, "name_en": "Rice", "name_km": "អង្ករ", "price": 2500 },
        { "id": 2, "name_en": "Fish", "name_km": "ត្រី", "price": 8000 }
      ]
    }
  ]
}
```

* **Requirements:**

  * 3–5 markets
  * 5–10 items per market
  * Prices in KHR
  * IDs must be unique and consistent for CRUD operations

---

## **3. User Experience Specifications**

* Desktop-first design with **clear spacing, legible fonts, and intuitive layout**
* Color-coded tables for price highlights
* Interactive charts with hover tooltips
* Clear success/failure notifications for CRUD actions
* Language toggle **always visible** and fully functional

---

## **4. Deliverables**

1. Functional prototype with all core pages and item-level CRUD
2. Mock JSON data file/array
3. Fully bilingual interface (English ↔ Khmer)
4. Desktop-first polished UI
5. Demo walkthrough script ready for assignment submission

---

## **5. Implementation Constraints**

* **Time:** 2-week solo project
* **Scope:** Focus on core features, item-level CRUD only
* **Data:** In-memory JSON sufficient for demo
* **Demo:** Must run **fully functional** without manual setup

---

## **6. Advantages of This Refined Specification**

* Focused MVP ensures **timely completion**
* Clean, readable, bilingual UX ensures **user accessibility**
* Demonstrates **full-stack CRUD capability** in a simple, practical context
* Demo-ready: polished tables, charts, notifications, and workflow
