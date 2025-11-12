import Navbar from "@/components/Navbar";
import { showErrorToast } from "@/components/Toast";
import { deleteData, getAPI } from "@/Services";
import { ShoppingBag, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping - discount;

  const handleRemoveCartIte = async (id) => {
    setLoading(true);
    deleteData({
      endPoint: `/cart/${id}`,
      onSuccess: (response) => {
        console.log("Removed cart item:", response);
        setCartItems(response.data.items);
        setLoading(false);
      },
      onError: (error) => {
        console.log("Error removing cart item:", error);
        setLoading(false);
        showErrorToast(error.response?.data?.message || error.message);
      },
    });
  };
  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return; // Don't allow quantity less than 1

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handleGetUserCart = async () => {
    setLoading(true);
    getAPI({
      endPoint: `/cart`,
      onSuccess: (response) => {
        console.log("User cart data:", response);
        setCartItems(response.data.items);
        setLoading(false);
      },
      onError: (error) => {
        console.log("Error fetching cart:", error);
        setLoading(false);
        showErrorToast(error.response?.data?.message || error.message);
      },
    });
  };

  useEffect(() => {
    handleGetUserCart();
  }, []);

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

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-white rounded-3xl p-12 border border-orange-100 max-w-md mx-auto">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => nav("/")}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">{cartItems.length} items in your cart</p>
        </div>
        <button
          onClick={() => nav("/")}
          className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((data, index) => {
            let item = data.product;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-xl transition-all"
              >
                <div className="flex gap-6">
                  <div className="relative group">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-40 h-40 object-cover rounded-xl cursor-pointer group-hover:opacity-90 transition-opacity"
                      onClick={() => nav(`/product/${item._id}`)}
                    />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                      {item.age}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className="text-xl font-bold text-gray-800 mb-1 cursor-pointer hover:text-orange-600 transition-colors"
                            onClick={() => nav(`/product/${item._id}`)}
                          >
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Star
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />
                            <span className="text-sm text-gray-600">
                              {item.rating}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            console.log("Removing item:", item._id);
                            e.stopPropagation();
                            handleRemoveCartIte(data._id);
                          }}
                          className="w-10 h-10 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-gray-600">Size:</span>
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-semibold border border-orange-200">
                          {data.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                        <button
                          className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 font-semibold text-gray-700 transition-colors shadow-sm"
                          onClick={() =>
                            handleUpdateQuantity(data._id, data.quantity, -1)
                          }
                        >
                          -
                        </button>
                        <span className="text-lg font-bold text-gray-800 w-12 text-center">
                          {data.quantity}
                        </span>
                        <button
                          className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 font-semibold text-gray-700 transition-colors shadow-sm"
                          onClick={() =>
                            handleUpdateQuantity(data._id, data.quantity, 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">
                          ₹{data.price * data.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
              <h3 className="text-xl font-bold mb-1">Order Summary</h3>
              <p className="text-white/80 text-sm">Review your order details</p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    Shipping
                    {shipping === 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-1">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                      Add ₹{2000 - subtotal} more to get FREE shipping!
                    </p>
                  </div>
                )}

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Total Amount
                  </span>
                  <span className="text-3xl font-bold text-orange-600">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 mb-4">
                Proceed to Checkout
              </button>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Easy returns within 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Cash on delivery available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
