import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { showErrorToast } from "@/components/Toast";
import { getAPI } from "@/Services";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const nav = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 new loading state

  // const category = categories.find((c) => c.id === categoryId);
  // const products = allProducts.filter((p) => p.category === categoryId);

  const categoryId = params.categoryId;

  const handleGetCategoryProducts = async () => {
    setLoading(true);

    getAPI({
      endPoint: `/products/category/${categoryId}`,
      onSuccess: (response) => {
        setProducts(response.products || []);
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
        showErrorToast(error.response?.data?.message || error.message);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    handleGetCategoryProducts();
  }, [categoryId]);

  // 🌀 Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // 🛍 No products state
  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No products found in this category
        </h1>
        <button
          onClick={() => nav("/")}
          className="text-orange-600 hover:text-orange-700"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  // ✅ Main category content
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => nav("/")}
          className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
        >
          ← Back to Home
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
            {categoryId}
          </h1>
          <p className="text-gray-600">{products.length} products available</p>
        </div>
        {/* <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors"
        >
          <Filter size={20} />
          Filters
        </button> */}
      </div>

      <div className="flex gap-6">
        {showFilters && (
          <FilterSidebar
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
        )}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                showSize={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
