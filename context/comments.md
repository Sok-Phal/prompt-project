# **Project Success Plan & Checklists**

**Project:** Essential Goods Price Tracker (English–Khmer)
**Duration:** 2 Weeks
**Goal:** Functional prototype with core features, bilingual support, and CRUD demo.

---

## **1. Scope & MVP Checklist**

* [ ] Home Page displays essential goods with prices.
* [ ] Market Comparison Page shows multiple markets side-by-side.
* [ ] Price Trends Page visualizes historical price charts.
* [ ] Admin Panel allows Add/Edit/Delete items.
* [ ] Language toggle (English ↔ Khmer) works throughout all pages.
* [ ] JSON mock data is consistent and preloaded with at least 3 markets × 5 items.
* [ ] Desktop-first responsive layout; simple, clean, and readable.

---

## **2. Technical Checklist**

### Backend (Node + Express)

* [ ] Set up Express project and folder structure.
* [ ] Create API endpoints for:

  * `GET /markets` → retrieve all markets with items.
  * `POST /market/:id/item` → add a new item.
  * `PUT /market/:id/item/:itemId` → update an item.
  * `DELETE /market/:id/item/:itemId` → delete an item.
* [ ] Test each endpoint with Postman or browser.
* [ ] Handle basic input validation (price numeric, names not empty).

### Frontend (React)

* [ ] Setup React project with React Router.
* [ ] Implement Home Page with table of prices.
* [ ] Implement Market Comparison Page with color-coded table.
* [ ] Implement Price Trends Page with charts (Chart.js/Recharts).
* [ ] Implement Admin Panel with forms for CRUD operations.
* [ ] Integrate bilingual toggle using i18next.
* [ ] Ensure frontend calls backend API correctly and displays updated data.

### Styling & UX

* [ ] Use TailwindCSS for consistent design and responsive layout.
* [ ] Tables and charts readable and visually clean.
* [ ] Language toggle button visible and intuitive.
* [ ] Admin panel forms have input validation feedback.

---

## **3. Testing & Debug Checklist**

* [ ] Verify data displays correctly in English and Khmer.
* [ ] Test CRUD: Add/Edit/Delete works for multiple items.
* [ ] Charts update correctly when selecting different items.
* [ ] Market Comparison table color codes min/max prices accurately.
* [ ] Test layout across Chrome, Edge, and Firefox.
* [ ] Check for console errors or broken routes.
* [ ] Test responsiveness on different screen sizes (desktop + small screens).

---

## **4. Project Timeline & Daily Checklists**

### **Week 1**

**Day 1:**

* [ ] Initialize React + Node project.
* [ ] Set up folder structure and install dependencies (TailwindCSS, React Router, Chart.js, i18next).

**Day 2:**

* [ ] Create mock JSON data for markets and items.
* [ ] Build backend API endpoints (GET all markets, CRUD for items).

**Day 3:**

* [ ] Test backend endpoints with Postman or fetch calls.
* [ ] Begin Home Page: fetch data and display price table.

**Day 4:**

* [ ] Implement Market Comparison Page with color-coded table.
* [ ] Test frontend integration with backend API.

**Day 5–7:**

* [ ] Polish Home and Comparison pages.
* [ ] Add bilingual toggle support.
* [ ] Ensure basic responsive styling with TailwindCSS.

---

### **Week 2**

**Day 8:**

* [ ] Implement Price Trends Page with charts for selected items.
* [ ] Connect chart data to mock JSON via backend API.

**Day 9:**

* [ ] Build Admin Panel: Add/Edit/Delete items with forms.
* [ ] Integrate notifications for CRUD actions (success/error).

**Day 10:**

* [ ] Connect Admin Panel to backend endpoints.
* [ ] Test full CRUD workflow end-to-end.

**Day 11–12:**

* [ ] Polish UI design: layout, color scheme, font readability.
* [ ] Ensure bilingual toggle works on all pages.

**Day 13:**

* [ ] Full project testing: Home, Comparison, Trends, Admin Panel.
* [ ] Verify charts, tables, forms, and language toggle.

**Day 14:**

* [ ] Prepare demo walkthrough script.
* [ ] Conduct a practice demo: click through pages, perform CRUD, switch languages.
* [ ] Fix any remaining bugs and finalize code.

---

## **5. Success Recommendations**

* Keep the **scope tight**; focus on core features first.
* **Test frequently** after each feature addition to catch bugs early.
* **Use reusable React components** for tables, rows, forms, and charts to save time.
* Ensure **mock data structure** is consistent to avoid integration errors.
* Allocate at least **one full day for walkthrough rehearsal** to ensure demo runs smoothly.

---

This checklist-based PRD ensures:

* Clear **development milestones**.
* **Daily actionable tasks** to prevent delays.
* Smooth **demo preparation** with all features showcased.

---

If you want, I can also **create a visual “Page & Data Flow Diagram”** that maps all pages, components, and backend endpoints—perfect for attaching to this PRD to make it fully professional.

Do you want me to create that diagram next?
