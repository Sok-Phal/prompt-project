Absolutely ✅ Let’s **elaborate the requirements in a precise, professional, and detailed manner**, ensuring that every aspect necessary for this project is clearly documented and nothing is left ambiguous. This will form a **comprehensive requirements specification** suitable for a PRD.

---

# **Requirements Specification: Essential Goods Price Tracker**

**Project Context:**
A **desktop-first, bilingual (English–Khmer) web application prototype** designed for **ordinary citizens in Southeast Asia**, particularly Cambodia. The application provides **transparent access to essential goods prices**, comparison across markets, historical price trends, and demonstrates **item-level CRUD functionality** using **mock JSON data**.

---

## **1. Functional Requirements (What the system must do)**

### **1.1 Home Page – Price Overview**

* **Purpose:** Provide a single view of essential goods and their prices.
* **Functional Requirements:**

  1. Display a **table of items per market** (columns: Item Name, Market Name, Price).
  2. Highlight **lowest price in green** and **highest price in red** for quick comparison.
  3. Implement **search/filter functionality** for item names.
  4. Support **bilingual display** (English ↔ Khmer) for table headers and item names.
  5. Provide **hover tooltips** for additional info (optional: last updated timestamp).
  6. Allow **manual language toggle** visible on all pages.
* **Constraints:**

  * Display **3–5 markets** and **5–10 items per market** for clarity.

---

### **1.2 Market Comparison Page**

* **Purpose:** Compare prices of items across multiple markets side by side.
* **Functional Requirements:**

  1. Table layout: **rows = items**, **columns = markets**, **cells = prices**.
  2. Color-code minimum and maximum prices.
  3. Dropdown filters to **select items or markets**.
  4. Sort items by price (ascending/descending).
  5. Maintain **bilingual labels**.
* **Constraints:**

  * Maximum of **3–5 markets** displayed at once to avoid clutter.

---

### **1.3 Price Trends Page**

* **Purpose:** Display historical price trends for items.
* **Functional Requirements:**

  1. **Line chart** showing price changes over time.
  2. Dropdown to select an item for the chart.
  3. Hover tooltip displaying exact price and date.
  4. Chart labels, axes, legend **fully bilingual**.
* **Constraints:**

  * Use mock data for **7–14 days** only.
  * Chart must update dynamically when user selects a different item.

---

### **1.4 Admin Panel – Item-Level CRUD**

* **Purpose:** Demonstrate backend data management functionality.
* **Functional Requirements:**

  1. **Add Item:** Form to input item name and price.
  2. **Edit Item:** Update existing item’s name and price.
  3. **Delete Item:** Delete an item with a confirmation prompt.
  4. **Notifications:** Display success/failure messages for every action.
  5. **Input Validation:**

     * Price must be numeric.
     * Item names must not be empty.
     * Item names must be unique per market.
* **Constraints:**

  * CRUD operations **only at item-level**, no market-level CRUD.
  * Data stored **in-memory** for demo; persistence optional.

---

### **1.5 Language Toggle**

* **Purpose:** Provide accessibility for English and Khmer users.
* **Functional Requirements:**

  1. Manual toggle button **visible on all pages**.
  2. Translate **table headers, item names, chart labels, form labels, and notifications**.
  3. Updates the **entire page instantly** without requiring reload.

---

## **2. Data Requirements**

### **2.1 Mock Data Structure**

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

### **2.2 Data Requirements**

1. Minimum **3 markets**, each with **5–10 items**.
2. Prices in **KHR** (Cambodian Riel).
3. **Unique IDs** for markets and items for CRUD operations.
4. Consistent naming for both English and Khmer.

---

## **3. Technical Requirements**

### **3.1 Frontend**

* **Framework:** React.js
* **Routing:** React Router
* **Styling:** TailwindCSS (desktop-first)
* **Charts:** Chart.js or Recharts
* **Bilingual Support:** i18next
* **Forms:** React Hook Form or controlled components

### **3.2 Backend**

* **Framework:** Node.js + Express.js
* **Endpoints:**

  * `GET /markets` → Retrieve all markets and items
  * `POST /market/:id/item` → Add a new item
  * `PUT /market/:id/item/:itemId` → Update item name/price
  * `DELETE /market/:id/item/:itemId` → Delete an item

### **3.3 Functional Integration**

* Frontend communicates with backend **via RESTful API**.
* Data returned in **JSON format**.
* All CRUD operations must **update frontend immediately**.

---

## **4. User Experience Requirements**

1. **Desktop-first layout**, visually clean and legible.
2. Tables **color-coded** for min/max prices.
3. Charts **interactive**, with hover tooltips.
4. Notifications for CRUD success/failure.
5. Language toggle **always visible** and consistent.
6. Smooth, intuitive navigation between Home → Comparison → Trends → Admin.

---

## **5. Demo Requirements**

1. Full demo **walkthrough script** prepared.
2. Mock data must allow **all CRUD operations** to be demonstrated.
3. All pages must be **fully functional** without manual configuration.
4. Charts and tables **display correct mock data**.
5. Bilingual toggle must work **consistently across all pages**.

---

## **6. Constraints**

* **Time:** 2-week solo project.
* **Scope:** Only core features (item-level CRUD, bilingual support, 3–5 markets, 5–10 items per market).
* **Data:** In-memory JSON acceptable; no real database required.
* **Platform:** Desktop-first web browser; optional minimal responsiveness.

---

## **7. Success Criteria**

* All functional pages work with **mock data**.
* Admin panel demonstrates **full CRUD workflow**.
* Price tables and trend charts are **readable, color-coded, and interactive**.
* Language toggle **fully operational**.
* UX is **intuitive, polished, and consistent**.
* Demo script can show **all key features** in a 5–10 minute walkthrough.