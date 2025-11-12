import HomePage from "./HomePage";
import { useEffect, useState, useCallback, useRef } from "react";
import { getAPI } from "@/Services";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";
import { showErrorToast } from "@/components/Toast";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore]
  );

  // Initial data fetch (categories + first page of products)
  const handleGetInitialData = async () => {
    try {
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
      setLoading(true);
      setError(null);

      const [categoriesResponse, productsResponse] = await Promise.all([
        new Promise((resolve, reject) =>
          getAPI({
            endPoint: "/categories",
            onSuccess: resolve,
            onError: reject,
          })
        ),
        new Promise((resolve, reject) =>
          getAPI({
            endPoint: user?.id
              ? `/products?page=1&limit=4&id=${user?.id}`
              : `/products?page=1&limit=4`,
            onSuccess: resolve,
            onError: reject,
          })
        ),
      ]);

      setCategories(categoriesResponse.categories || []);
      setAllProducts(productsResponse.products || []);
      setTotalPages(productsResponse.pages || 1);
      setHasMore(productsResponse.page < productsResponse.pages);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch more products on scroll
  const handleGetMoreProducts = async (currentPage) => {
    try {
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
      setLoadingMore(true);

      const productsResponse = await new Promise((resolve, reject) =>
        getAPI({
          endPoint: user?.id
            ? `/products?page=${currentPage}&limit=4&id=${user?.id}`
            : `/products?page=${currentPage}&limit=4`,
          onSuccess: resolve,
          onError: reject,
        })
      );

      // Append new products to existing ones
      setAllProducts((prev) => [...prev, ...(productsResponse.products || [])]);
      setTotalPages(productsResponse.pages || 1);
      setHasMore(productsResponse.page < productsResponse.pages);
    } catch (err) {
      showErrorToast(error.response?.data?.message || error.message);
      console.error("Error fetching more products:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    handleGetInitialData();
  }, []);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      handleGetMoreProducts(page);
    }
  }, [page]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  // Show main content once loaded
  return (
    <>
      <HomePage
        categories={categories}
        products={allProducts}
        lastProductRef={lastProductRef}
      />

      {/* Loading indicator for infinite scroll */}
      {loadingMore && (
        <div className="flex justify-center items-center py-8">
          <BallTriangle
            height={40}
            width={40}
            radius={5}
            color="#f97316"
            ariaLabel="loading-more"
            visible={true}
          />
        </div>
      )}

      {/* End of products message */}
      {!hasMore && allProducts.length > 0 && (
        <div className="text-center py-8 text-gray-500 font-medium">
          🎉 You've seen all products! (Page {totalPages} of {totalPages})
        </div>
      )}
    </>
  );
};

export default Dashboard;
