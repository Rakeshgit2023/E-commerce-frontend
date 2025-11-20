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

  // // Initial data fetch (categories + first page of products)
  // const handleGetInitialData = async () => {
  //   try {
  //     const user =
  //       JSON.parse(localStorage.getItem("user")) ||
  //       JSON.parse(sessionStorage.getItem("user"));
  //     setLoading(true);
  //     setError(null);

  //     const [categoriesResponse, productsResponse] = await Promise.all([
  //       new Promise((resolve, reject) =>
  //         getAPI({
  //           endPoint: "/categories",
  //           onSuccess: resolve,
  //           onError: reject,
  //         })
  //       ),
  //       new Promise((resolve, reject) =>
  //         getAPI({
  //           endPoint: user?.id
  //             ? `/products?page=1&limit=4&id=${user?.id}`
  //             : `/products?page=1&limit=4`,
  //           onSuccess: resolve,
  //           onError: reject,
  //         })
  //       ),
  //     ]);

  //     setCategories(categoriesResponse.categories || []);
  //     setAllProducts(productsResponse.products || []);
  //     setTotalPages(productsResponse.pages || 1);
  //     setHasMore(productsResponse.page < productsResponse.pages);
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //     setError("Failed to load data. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Fetch more products on scroll
  // const handleGetMoreProducts = async (currentPage) => {
  //   try {
  //     const user =
  //       JSON.parse(localStorage.getItem("user")) ||
  //       JSON.parse(sessionStorage.getItem("user"));
  //     setLoadingMore(true);

  //     const productsResponse = await new Promise((resolve, reject) =>
  //       getAPI({
  //         endPoint: user?.id
  //           ? `/products?page=${currentPage}&limit=4&id=${user?.id}`
  //           : `/products?page=${currentPage}&limit=4`,
  //         onSuccess: resolve,
  //         onError: reject,
  //       })
  //     );

  //     // Append new products to existing ones
  //     setAllProducts((prev) => [...prev, ...(productsResponse.products || [])]);
  //     setTotalPages(productsResponse.pages || 1);
  //     setHasMore(productsResponse.page < productsResponse.pages);
  //   } catch (err) {
  //     showErrorToast(error.response?.data?.message || error.message);
  //     console.error("Error fetching more products:", err);
  //   } finally {
  //     setLoadingMore(false);
  //   }
  // };

  // // Initial load
  // useEffect(() => {
  //   handleGetInitialData();
  // }, []);

  // // Load more when page changes
  // useEffect(() => {
  //   if (page > 1) {
  //     handleGetMoreProducts(page);
  //   }
  // }, [page]);

  useEffect(() => {
    setLoading(true);
    const categoriesResponse = {
      success: true,
      count: 5,
      categories: [
        {
          _id: "6907552446650715c3621ce1",
          name: "Boys Fashion",
          slug: "boys-fashion",
          description: "Clothing collection for boys",
          color: "bg-blue-500",
          isActive: true,
          productCount: 1,
          createdAt: "2025-11-02T12:57:08.679Z",
          updatedAt: "2025-11-02T17:15:23.231Z",
          __v: 0,
        },
        {
          _id: "690756c446650715c3621cf5",
          name: "Casual",
          slug: "casual",
          description: "Comfortable and everyday clothing",
          color: "bg-orange-500",
          isActive: true,
          productCount: 2,
          createdAt: "2025-11-02T13:04:04.669Z",
          updatedAt: "2025-11-02T17:05:14.408Z",
          __v: 0,
        },
        {
          _id: "6907553846650715c3621ce5",
          name: "Girls Fashion",
          slug: "girls-fashion",
          description: "Clothing collection for girls",
          color: "bg-pink-500",
          isActive: true,
          productCount: 1,
          createdAt: "2025-11-02T12:57:28.375Z",
          updatedAt: "2025-11-02T16:56:37.935Z",
          __v: 0,
        },
        {
          _id: "690756a146650715c3621ced",
          name: "Party Wear",
          slug: "party-wear",
          description: "Outfits for parties and special occasions",
          color: "bg-purple-500",
          isActive: true,
          productCount: 1,
          createdAt: "2025-11-02T13:03:29.234Z",
          updatedAt: "2025-11-02T17:12:36.402Z",
          __v: 0,
        },
        {
          _id: "690756b346650715c3621cf1",
          name: "School Wear",
          slug: "school-wear",
          description: "Uniforms and school-friendly outfits",
          color: "bg-green-500",
          isActive: true,
          productCount: 1,
          createdAt: "2025-11-02T13:03:47.808Z",
          updatedAt: "2025-11-02T17:08:53.880Z",
          __v: 0,
        },
      ],
    };
    const productsResponse = {
      success: true,
      count: 4,
      total: 6,
      page: 1,
      pages: 2,
      products: [
        {
          _id: "690791ab2e6cb3debf9661bb",
          name: "Casual Boys Cotton Outfit Set",
          description:
            "Comfortable everyday outfit for boys, featuring a soft cotton t-shirt and brown pants. Perfect for playtime or outings.",
          price: 999,
          originalPrice: 1600,
          discount: 21,
          category: "Boys Fashion",
          age: "5-8 years",
          sizes: ["S", "M", "L"],
          colors: ["White", "Brown", "Blue"],
          images: [
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103720/dress-gallery/products/yvgooxx3knh2czhpwvon.jpg",
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103721/dress-gallery/products/o4mm3ixxynp5vvefojek.jpg",
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103721/dress-gallery/products/mqo7o0nrwml8pfbyhzzm.jpg",
          ],
          stock: 25,
          rating: 0,
          numReviews: 0,
          isFeatured: true,
          isActive: true,
          material: "Cotton Blend",
          brand: "TinyTrends",
          tags: ["casual", "boys", "t-shirt", "pants", "comfortable", "summer"],
          reviews: [],
          createdAt: "2025-11-02T17:15:23.128Z",
          updatedAt: "2025-11-02T17:15:23.128Z",
          __v: 0,
          isInWishlist: false,
        },
        {
          _id: "690791042e6cb3debf9661b6",
          name: "Grey & White Party T-Shirt",
          description:
            "A stylish grey and white party T-shirt crafted with soft, breathable fabric. Designed to keep kids looking sharp and feeling comfortable during special occasions.",
          price: 1300,
          originalPrice: 1600,
          discount: 19,
          category: "Party Wear",
          age: "5-8 years",
          sizes: ["S", "M", "L"],
          colors: ["Grey", "White"],
          images: [
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103530/dress-gallery/products/dgb0cykaaqy2jugznc3p.jpg",
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103544/dress-gallery/products/mioa4szot8qit3c4iwdg.jpg",
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103554/dress-gallery/products/bmzxbwbgjs8b6mjkvehd.jpg",
          ],
          stock: 10,
          rating: 0,
          numReviews: 0,
          isFeatured: true,
          isActive: true,
          material: "Cotton Blend",
          brand: "TinyTrends",
          tags: ["kids", "party", "tshirt", "grey", "white", "fashion"],
          reviews: [],
          createdAt: "2025-11-02T17:12:36.302Z",
          updatedAt: "2025-11-02T17:12:36.302Z",
          __v: 0,
          isInWishlist: false,
        },
        {
          _id: "690790252e6cb3debf9661b0",
          name: "Classic Red School T-Shirt",
          description:
            "A comfortable and durable red school T-shirt, perfect for everyday wear. Made with premium cotton to keep kids cool and active throughout the day.",
          price: 850,
          originalPrice: 1050,
          discount: 19,
          category: "School Wear",
          age: "8-12 years",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Red", "Black"],
          images: [
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103322/dress-gallery/products/pf1sivu7582x0rfqcs8l.jpg",
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103322/dress-gallery/products/smmevotb7u6r9mgiw6tp.jpg",
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103328/dress-gallery/products/ixm2rw9bnmbltcdpv8vg.jpg",
          ],
          stock: 20,
          rating: 0,
          numReviews: 0,
          isFeatured: true,
          isActive: true,
          material: "100% Cotton",
          brand: "EduWear",
          tags: ["kids", "school", "tshirt", "red", "cotton", "uniform"],
          reviews: [],
          createdAt: "2025-11-02T17:08:53.776Z",
          updatedAt: "2025-11-02T17:08:53.776Z",
          __v: 0,
          isInWishlist: false,
        },
        {
          _id: "69078f4a2e6cb3debf9661aa",
          name: "Bright Yellow Hooded Jacket",
          description:
            "A cheerful yellow hooded jacket for kids, perfect for playtime and outdoor adventures. Made with breathable cotton and soft lining for all-day comfort.",
          price: 1100,
          originalPrice: 1399,
          discount: 21,
          category: "Casual",
          age: "3-5 years",
          sizes: ["S", "M", "L"],
          colors: ["Yellow", "Green"],
          images: [
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103109/dress-gallery/products/adcqdkkrnvsxw8qjlrap.jpg",
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103111/dress-gallery/products/dad7gqvwmi2gbdzw9gm1.jpg",
            "https://res.cloudinary.com/dtfwxepge/image/upload/v1762103108/dress-gallery/products/y8b8e4eno77fk2myuasi.jpg",
          ],
          stock: 30,
          rating: 0,
          numReviews: 0,
          isFeatured: true,
          isActive: true,
          material: "100% Cotton",
          brand: "TinyTrends",
          tags: ["kids", "sweatshirt", "casual", "cotton", "mustard"],
          reviews: [],
          createdAt: "2025-11-02T17:05:14.316Z",
          updatedAt: "2025-11-02T17:05:14.316Z",
          __v: 0,
          isInWishlist: false,
        },
      ],
    };

    setCategories(categoriesResponse.categories || []);
    setAllProducts(productsResponse.products || []);
    setTotalPages(productsResponse.pages || 1);
    setHasMore(productsResponse.page < productsResponse.pages);
    setLoading(false);
  }, []);

  // Show loading state
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
