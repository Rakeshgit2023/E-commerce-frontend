import { getAPI } from "@/Services";
import {
  Bell,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  User,
  X,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "./Toast";

const Navbar = ({ activeTab, setActiveTab, onLogoClick }) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Optional: Listen for storage changes (e.g., login/logout in another tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleSearchProduct = async (query, page = 1) => {
    // Only update search query on new search (page 1)
    if (page === 1) {
      setSearchQuery(query);
      setCurrentPage(1);
    }

    // Cancel previous API call if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear previous timeout only for new searches
    if (page === 1 && searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If query is empty, clear results
    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      setHasMoreResults(false);
      setTotalResults(0);
      return;
    }

    // Debounce only for new searches (page 1)
    const delay = page === 1 ? 300 : 0;

    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(true);

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();

      getAPI({
        endPoint: `/products/search?q=${query}&page=${page}&limit=4`,
        signal: abortControllerRef.current.signal,
        onSuccess: (response) => {
          console.log("Search response:", response);
          const newProducts = response.products || [];

          // Append results for pagination, replace for new search
          setSearchResults((prev) =>
            page === 1 ? newProducts : [...prev, ...newProducts]
          );
          setShowResults(true);
          setIsSearching(false);
          setHasMoreResults(response.hasNextPage || false);
          setTotalResults(response.totalProducts || 0);
          setCurrentPage(page);
        },
        onError: (error) => {
          console.log("Search error:", error);
          if (page === 1) {
            setSearchResults([]);
          }
          setShowResults(true);
          setIsSearching(false);
          setHasMoreResults(false);
          showErrorToast(error.response?.data?.message || error.message);
        },
      });
    }, delay);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // Check if scrolled to bottom (with 10px threshold)
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      // Load more if not already loading and there are more results
      if (!isSearching && hasMoreResults) {
        handleSearchProduct(searchQuery, currentPage + 1);
      }
    }
  };

  const handleProductClick = (productId) => {
    nav(`/product/${productId}`);
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      // Clear timeout on unmount
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      // Abort pending API call on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => nav("/")}
              className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2"
            >
              <Sparkles className="text-orange-500" size={24} />
              Dress Gallery
            </button>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => {
                  setActiveTab("discover");
                  nav("/");
                }}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "discover"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveTab("boys");
                  nav("/category/Boys Fashion");
                }}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "boys"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                Boys
              </button>
              <button
                onClick={() => {
                  setActiveTab("girls");
                  nav("/category/Girls Fashion");
                }}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "girls"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                Girls
              </button>
              <button
                onClick={() => {
                  setActiveTab("specialDeals");
                  nav("/specialDeals");
                }}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "specialDeals"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                Special Deals
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar with Dropdown */}
            <div className="hidden lg:block relative search-container">
              <div className="flex items-center bg-orange-50 rounded-full px-4 py-2 gap-2 border border-orange-100">
                <Search size={18} className="text-orange-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchProduct(e.target.value)}
                  onFocus={() => searchQuery && setShowResults(true)}
                  placeholder="Search kids fashion..."
                  className="bg-transparent outline-none text-sm w-48"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowResults(false);
                      setSearchResults([]);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showResults && !isSearching && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-700">
                      Found {totalResults} result{totalResults !== 1 ? "s" : ""}
                      {totalResults > searchResults.length && (
                        <span className="text-gray-500 ml-1">
                          (Showing {searchResults.length})
                        </span>
                      )}
                    </p>
                  </div>
                  <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="max-h-96 overflow-y-auto"
                  >
                    {searchResults.map((product) => (
                      <div
                        key={product._id}
                        onClick={() => handleProductClick(product._id)}
                        className="flex items-center gap-4 p-4 hover:bg-orange-50 cursor-pointer transition-all border-b border-gray-50 last:border-b-0"
                      >
                        <img
                          src={
                            product.images?.[0] ||
                            "https://via.placeholder.com/64"
                          }
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 capitalize">
                              {product.category}
                            </span>
                            {product.age && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                  {product.age}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">
                            ₹{product.price}
                          </p>
                          {product.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star
                                size={12}
                                className="text-yellow-400 fill-yellow-400"
                              />
                              <span className="text-xs text-gray-600">
                                {product.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Loading More Indicator */}
                    {hasMoreResults && !isSearching && (
                      <div className="p-4 text-center text-sm text-gray-500">
                        Scroll for more results...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isSearching && showResults && (
                <div className="absolute top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 z-50">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-600 text-sm">Searching...</p>
                  </div>
                </div>
              )}

              {/* No Results Message */}
              {showResults &&
                !isSearching &&
                searchQuery &&
                searchResults.length === 0 && (
                  <div className="absolute top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 z-50">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium mb-1">
                        No results found
                      </p>
                      <p className="text-sm text-gray-500">
                        Try searching with different keywords
                      </p>
                    </div>
                  </div>
                )}
            </div>
            {isLoggedIn ? (
              <>
                <button className="p-2 hover:bg-orange-50 rounded-full transition-colors relative">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                </button>
                <button
                  className="p-2 hover:bg-orange-50 rounded-full transition-colors"
                  onClick={() => nav("/cart")}
                >
                  <ShoppingBag size={20} className="text-gray-600" />
                </button>
                <button
                  className="p-2 hover:bg-orange-50 rounded-full transition-colors"
                  onClick={() => nav("/profile")}
                >
                  <User size={20} className="text-gray-600" />
                </button>
              </>
            ) : (
              <button
                onClick={() => nav("/signIn")}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 rounded-full transition-colors shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
