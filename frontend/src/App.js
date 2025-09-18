import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./i18n/i18n";

// Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MarketComparison from "./pages/MarketComparison";
import PriceTrends from "./pages/PriceTrends";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "km" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Router>
      <div className="min-h-screen bg-base-100">
        <Navbar onToggleLanguage={toggleLanguage} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comparison" element={<MarketComparison />} />
            <Route path="/trends" element={<PriceTrends />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <footer className="bg-neutral text-white py-4 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">{i18n.t("footer")}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
