import Navbar from "@/components/Navbar";
import AuthLayout from "@/pages/AuthLayout";
import Cart from "@/pages/Cart";
import Category from "@/pages/Category";
import Dashboard from "@/pages/Dashboard";
import ProductDetail from "@/pages/ProductDetail";
import Profile from "@/pages/Profile";
import SpecialDeals from "@/pages/SpecialDeals";
import { useEffect, useState } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

const ParentRoute = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("discover");

  const hideNavbarRoutes = [
    "/signUp",
    "/signIn",
    "/forgotPassword",
    "/changePassword",
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Navigate back to home when logo is clicked
  const handleLogoClick = () => {
    setActiveTab("discover");
    nav("/");
  };

  // Automatically update active tab when route changes
  useEffect(() => {
    if (location.pathname.startsWith("/specialDeals")) {
      setActiveTab("specialDeals");
    } else if (location.pathname === "/category/Boys%20Fashion") {
      setActiveTab("boys");
    } else if (location.pathname === "/category/Girls%20Fashion") {
      setActiveTab("girls");
    } else {
      console.log(location.pathname);
      setActiveTab("discover");
    }
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {!shouldHideNavbar && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogoClick={handleLogoClick}
        />
      )}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signUp" element={<AuthLayout />} />
        <Route path="/signIn" element={<AuthLayout />} />
        <Route path="/forgotPassword" element={<AuthLayout />} />
        <Route path="/changePassword" element={<AuthLayout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/specialDeals" element={<SpecialDeals />} />
      </Routes>
    </div>
  );
};

export default ParentRoute;
