## 1. **Project Overview**

The **Essential Goods Price Tracker** is a web application designed to assist ordinary citizens in Southeast Asia, with a focus on Cambodia, to monitor and compare prices of essential daily goods. The platform provides a **simple, bilingual interface** (English and Khmer) that displays prices for items such as rice, fish, vegetables, and cooking oil across multiple local markets.

The system will include a basic administrative panel demonstrating CRUD operations to **add, edit, and remove goods and prices**, ensuring that users can interact with the data realistically. The goal is to create a **functional prototype** that showcases the concept and usability of a solution addressing daily-life economic challenges.

---

## 2. **Problem Statement**

In Southeast Asia, citizens often face **highly variable prices for essential goods** between markets. Many families struggle to budget effectively due to lack of price transparency. This can lead to overpayment, reduced access to necessary food items, and financial stress.

Currently, there is **no centralized, easy-to-use digital solution** that allows citizens to check and compare prices in a reliable, accessible format. By providing a simple tool for market price comparison, the project aims to **improve financial awareness and decision-making** among ordinary users.

---

## 3. **Objectives**

The primary objectives of the project are:

1. **Price Transparency:** Present essential goods prices in a clear, easy-to-read format.
2. **Market Comparison:** Enable users to view and compare prices across multiple local markets.
3. **Trend Visualization:** Provide charts for historical price trends using mock data.
4. **Bilingual Support:** Facilitate English–Khmer switching for wider accessibility.
5. **Admin Functionality:** Demonstrate CRUD capabilities for goods and price management.

---

## 4. **Target Users**

* **Primary Users:** Ordinary citizens (shoppers, students, workers) seeking information about local market prices.
* **Secondary Users:** Admin persona (for demonstration purposes only) to manage mock data through CRUD operations.

---

## 5. **Functional Requirements**

| Feature           | Description                                                                            | Priority |
| ----------------- | -------------------------------------------------------------------------------------- | -------- |
| Home Page         | Displays a table of essential goods with prices per market. Includes bilingual toggle. | High     |
| Market Comparison | Compares prices across markets in a visual, color-coded table.                         | High     |
| Price Trends      | Graphical representation of price history (mock data) per product using charts.        | Medium   |
| Admin Panel       | Add, Edit, Delete goods and prices; simulate backend CRUD operations.                  | High     |
| Language Toggle   | Manual switch between English and Khmer.                                               | Medium   |

**Additional Notes:**

* Data will be stored in a JSON file to simplify backend management.
* Charts and tables will use libraries such as **Chart.js or Recharts**.
* The application will be **desktop-first**, responsive, and user-friendly.

---

## 6. **Non-Functional Requirements**

1. **Usability:** Simple and intuitive navigation, clear typography, and minimal design clutter.
2. **Performance:** Pages should load within 2 seconds; frontend optimized for smooth interactions.
3. **Accessibility:** Support English and Khmer; readable fonts and clear color contrast.
4. **Scalability (Demo Scope):** Able to handle additional goods and markets easily, even if data is mocked.
5. **Technology Stack:**

   * Frontend: React.js, TailwindCSS, React Router, Chart.js/Recharts, i18next.
   * Backend: Node.js, Express.js.
   * Data: JSON file/array (mock).

---

## 7. **Data Structure (Example)**

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
    },
    {
      "id": 2,
      "name_en": "Orussey Market",
      "name_km": "ផ្សារអូរទស្សី",
      "items": [
        { "id": 1, "name_en": "Rice", "name_km": "អង្ករ", "price": 2400 },
        { "id": 2, "name_en": "Fish", "name_km": "ត្រី", "price": 7500 }
      ]
    }
  ]
}
```

---

## 8. **Project Timeline (2 Weeks)**

| Week   | Tasks                                                                                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Week 1 | - Set up project structure (React + Node + Express) <br> - Implement backend API endpoints with mock JSON <br> - Develop Home page and Market Comparison page                                    |
| Week 2 | - Implement Price Trends page with charts <br> - Build Admin panel with CRUD <br> - Integrate bilingual toggle <br> - Polish UI/UX, finalize styling <br> - Conduct walkthrough demo preparation |

---

## 9. **Expected Deliverables**

1. Functional prototype demonstrating:

   * Price tables per market
   * Comparison across markets
   * Trend charts for selected goods
   * CRUD operations in admin panel
   * English–Khmer language toggle
2. JSON-based mock data to simulate realistic market prices.
3. Presentation/demo ready for a **walkthrough showcasing key features**.

---

## 10. **Assumptions & Limitations**

* Prototype uses **mock data only**; no live market data integration.
* Single-user focus; multi-user authentication not required.
* Desktop-first design; mobile support is secondary.
* Functionality is scoped for a **2-week development period**.