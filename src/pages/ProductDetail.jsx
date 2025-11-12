import ProductCard from "@/components/ProductCard";
import { showErrorToast } from "@/components/Toast";
import { getAPI, postData } from "@/Services";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const nav = useNavigate();
  const params = useParams();
  const [product, setproduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const productId = params.productId;
  // const product = allProducts.find((p) => p.id === productId);

  const checkAuth = () => {
    const remember = localStorage.getItem("rememberMe");
    const token =
      (remember === "true" && localStorage.getItem("token")) ||
      (remember === "false" && sessionStorage.getItem("token"));

    return !!token;
  };

  const handleAddToCart = async () => {
    if (!checkAuth()) {
      nav("/signIn");
      return;
    }
    postData({
      endPoint: `/cart`,
      payload: {
        productId: product._id,
        size: selectedSize,
        color: product.colors[0],
        quantity: quantity,
      },
      onSuccess: (response) => {
        console.log("Added to cart:", response);
      },
      onError: (error) => {
        console.log("Error adding to cart:", error);
        showErrorToast(error.response?.data?.message || error.message);
      },
    });
  };
  // ✅ Add to wishlist
  const handleAddToWishlist = async () => {
    console.log("❤️ handleAddToWishlist fired");
    postData({
      endPoint: `/users/wishlist`,
      payload: { productId },
      onSuccess: (response) => {
        console.log("Added to wishlist:", response);
      },
      onError: (error) => {
        console.log("Error adding to wishlist:", error);
      },
    });
  };
  const handleGetProduct = async () => {
    setLoading(true);
    getAPI({
      endPoint: `/products/${productId}`,
      onSuccess: (response) => {
        console.log(response);
        setproduct(response.product);
        setRelatedProducts(response.relatedProducts);
        setSelectedSize(response.product.sizes[0]);
        setLoading(false);
      },
      onError: (error) => {
        console.log("Fetching product details for ID:", productId);
        console.log(error);
        setLoading(false);
        showErrorToast(error.response?.data?.message || error.message);
      },
    });
  };

  useEffect(() => {
    handleGetProduct();
  }, [productId]);

  // const sizes = ["S", "M", "L", "XL"];
  // const relatedProducts = allProducts
  //   .filter((p) => p.category === product.category && p.id !== product.id)
  //   .slice(0, 4);

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

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Product Not Found
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl overflow-hidden border border-orange-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-orange-100 cursor-pointer hover:border-orange-500 transition-colors"
              >
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            {product.age}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Star size={15} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-gray-500 text-sm">
                {`(${product.reviews.length} reviews)`}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 mb-5">
            <span className="text-2xl font-bold text-orange-600">
              ₹{product.price}
            </span>
            <span className="text-lg text-gray-400 line-through">
              {`₹ ${product.originalPrice}`}
            </span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              {`${product.discount}% OFF`}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-3 mb-4">
            <h3 className="font-semibold text-gray-800 mb-4">Select Size</h3>
            <div className="flex gap-3">
              {product?.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 text-md rounded-md font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-orange-600 text-white border-2 border-orange-600"
                      : "bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-4">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-colors"
              >
                -
              </button>
              <span className="text-base font-semibold text-gray-800 w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              className="w-[60%] py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <h3 className="font-semibold text-gray-800 mb-4">
              Product Details
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-800 w-24">
                  Category:
                </span>
                <span className="capitalize">{product.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-800 w-24">
                  Material:
                </span>
                <span>{product.material}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-800 w-24">Care:</span>
                <span>Machine wash cold</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-800 w-24">
                  Age Range:
                </span>
                <span>{product.age}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetail;
