import React, { useEffect, useState } from "react";
import { Heart, Star, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAPI, postData, deleteData } from "@/Services";
import { showErrorToast } from "@/components/Toast";

const SpecialDeals = () => {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { label: "All Deals", value: "all" },
    { label: "Boys Fashion", value: "Boys Fashion" },
    { label: "Girls Fashion", value: "Girls Fashion" },
    { label: "Party Wear", value: "Party Wear" },
    { label: "School Wear", value: "School Wear" },
    { label: "Casual", value: "Casual" },
  ];

  // ✅ Check if user is logged in
  const checkAuth = () => {
    const remember = localStorage.getItem("rememberMe");
    const token =
      (remember === "true" && localStorage.getItem("token")) ||
      (remember === "false" && sessionStorage.getItem("token"));

    return !!token;
  };

  // Fetch all deals
  const handlegetAllDeal = async () => {
    setLoading(true);
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    getAPI({
      endPoint: user?.id
        ? `/products?page=1&limit=20&id=${user?.id}${
            selectedFilter === "all" ? "" : `&category=${selectedFilter}`
          }`
        : `/products?page=1&limit=20${
            selectedFilter === "all" ? "" : `&category=${selectedFilter}`
          }`,
      onSuccess: (response) => {
        console.log(response?.products);
        // Map API products to match component structure
        const dealProducts = (response?.products || []).map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          rating: product.rating || 4.5,
          image: product.images?.[0] || "",
          age: product.age,
          isInWishlist: product.isInWishlist,
          category: product.category.toLowerCase().replace(/\s+/g, ""),
          size: product.sizes?.[0] || "M",
          dealType: ["Flash Sale", "Hot Deal", "Limited Offer", "Best Price"][
            Math.floor(Math.random() * 4)
          ],
        }));
        setProducts(dealProducts);
        setLoading(false);
        console.log(dealProducts);
      },
      onError: (error) => {
        console.log(error);
        showErrorToast(error.response?.data?.message || error.message);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    handlegetAllDeal();
  }, [selectedFilter]);

  // ✅ Add to wishlist
  const handleAddToWishlist = async (productId) => {
    if (!checkAuth()) {
      nav("/signIn");
      return;
    }

    console.log("❤️ handleAddToWishlist fired");

    // Optimistic update
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, isInWishlist: true } : p
      )
    );

    postData({
      endPoint: `/users/wishlist`,
      payload: { productId: productId },
      onSuccess: (response) => {
        console.log("Added to wishlist:", response);
      },
      onError: (error) => {
        console.log("Error adding to wishlist:", error);
        // Revert optimistic update on error
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, isInWishlist: false } : p
          )
        );
        showErrorToast(error.response?.data?.message || error.message);
      },
    });
  };

  // ✅ Remove from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    if (!checkAuth()) {
      nav("/signIn");
      return;
    }

    console.log("💔 handleRemoveFromWishlist fired");

    // Optimistic update
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, isInWishlist: false } : p
      )
    );

    deleteData({
      endPoint: `/users/wishlist/${productId}`,
      onSuccess: (response) => {
        console.log("Removed from wishlist:", response);
      },
      onError: (error) => {
        console.log("Error removing from wishlist:", error);
        // Revert optimistic update on error
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, isInWishlist: true } : p
          )
        );
      },
    });
  };

  // ✅ Toggle wishlist
  const toggleWishlist = (e, product) => {
    e.stopPropagation();

    if (product.isInWishlist) {
      handleRemoveFromWishlist(product.id);
    } else {
      handleAddToWishlist(product.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🔥 Special Deals
          </h1>
          <p className="text-gray-600 text-lg">
            Amazing discounts on kids fashion - Limited time only!
          </p>
        </div>
      </div>

      {/* Deal Banner with Countdown */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="relative text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🎉 Mega Sale Event
          </h2>
          <p className="text-xl mb-6">Up to 50% OFF on all kids fashion</p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm">Hours</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-3xl font-bold">34</p>
              <p className="text-sm">Minutes</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-3xl font-bold">56</p>
              <p className="text-sm">Seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedFilter === filter.value
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-orange-50 border border-orange-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No products found for this category
          </p>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            console.log(product);
            return (
              <div
                key={product.id}
                onClick={() => nav(`/product/${product.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all group cursor-pointer relative"
              >
                {/* Deal Badges */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {product.discount}% OFF
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {product.dealType}
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(e, product)}
                    className={`absolute bottom-4 right-4 w-10 h-10 ${
                      product.isInWishlist
                        ? "bg-pink-500 text-white"
                        : "bg-white hover:text-white hover:bg-orange-500"
                    } rounded-full flex items-center justify-center transition-colors shadow-lg z-20`}
                  >
                    <Heart
                      size={18}
                      className={product.isInWishlist ? "fill-white" : ""}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {product.age}
                  </span>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>

                  {/* Price with Original Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Banner */}
      <div className="mt-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Don't Miss Out!</h3>
        <p className="text-lg mb-6">
          Subscribe to get exclusive deals delivered to your inbox
        </p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-full text-gray-800 outline-none"
          />
          <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
            Subscribe
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialDeals;
