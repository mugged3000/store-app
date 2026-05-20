"use client";

import { useState } from "react";
import Sidebar         from "@/adminmenu/page";
import DashboardPage   from "@/dashboard/Dashboardpage";
import ProductListPage from "@/dashboard/Productlist";
import OrdersPage      from "@/dashboard/Orderpage";

const PAGE_TITLES = {
  dashboard: "Dashboard Overview",
  products:  "Product List",
  orders:    "Orders List",
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        fontFamily: "var(--font-syne, system-ui, sans-serif)",
        background: "#13111f",
      }}
    >
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <div
          className="shrink-0 px-6 py-4"
          style={{ background: "#6d28d9" }}
        >
          <span className="text-white font-bold text-[15px] tracking-wide">
            {PAGE_TITLES[activePage]}
          </span>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#13111f" }}>
          {activePage === "dashboard" && (
            <DashboardPage onViewAll={() => setActivePage("orders")} />
          )}
          {activePage === "products" && <ProductListPage />}
          {activePage === "orders"   && <OrdersPage />}
        </div>
      </div>
    </div>
  );
}