"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./Toast";
import Preloader from "./Preloader";
import { StoreProvider } from "@/context/StoreContext";
import { LoadingProvider } from "@/loading/LoadingContext";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <LoadingProvider>
      <StoreProvider>
        {!isAdmin && <Preloader />}
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <Footer />}
        <Toast />
      </StoreProvider>
    </LoadingProvider>
  );
}