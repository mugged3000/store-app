"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import ProductCard from "@/components/SearchProductCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (!q.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    fetch(`/api/products?q=${encodeURIComponent(q)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Search request failed");
        return res.json();
      })
      .then((data) => {
        if (active) setProducts(data.products ?? []);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [q]);

  return (
    <section className="w-full bg-[#0a0a0a] pt-28 sm:pt-32 pb-20" style={{ fontFamily: "var(--font-syne)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">

        <div className="mb-8 sm:mb-10">
          <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
            Search Results
          </p>
          <h1
            className="text-white font-bold leading-none"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(24px, 4vw, 38px)", letterSpacing: "-0.02em" }}
          >
            {q ? (
              <>
                Results for <span className="text-[#C9A84C]">&ldquo;{q}&rdquo;</span>
              </>
            ) : (
              "Search"
            )}
          </h1>
          {!loading && q && (
            <p className="text-white/35 text-[12.5px] mt-3">
              {products.length} {products.length === 1 ? "item" : "items"} found
            </p>
          )}
        </div>

        {!q.trim() && (
          <div className="flex flex-col items-center text-center py-20">
            <SearchIcon size={32} strokeWidth={1.6} className="text-white/20 mb-4" />
            <p className="text-white/40 text-[13px]">Type something in the search bar to get started.</p>
          </div>
        )}

        {loading && q.trim() && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col bg-[#111010] rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-[#181614]" />
                <div className="px-3 pt-3 pb-4">
                  <div className="h-3 bg-white/[0.06] rounded mb-2 w-3/4" />
                  <div className="h-3 bg-white/[0.06] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-[#e86060] text-[13px] text-center py-16">
            Something went wrong loading search results. Please try again.
          </p>
        )}

        {!loading && !error && q.trim() && products.length === 0 && (
          <div className="flex flex-col items-center text-center py-20">
            <SearchIcon size={32} strokeWidth={1.6} className="text-white/20 mb-4" />
            <p className="text-white/55 text-[14px] font-semibold mb-1">No results found</p>
            <p className="text-white/30 text-[12.5px]">Try a different search term.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}