// import { deleteData, postData } from "@/Services";
// import { Heart, ShoppingBag, Star } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { showErrorToast } from "./Toast";

// const ProductCard = ({ product }) => {
//   const nav = useNavigate();
//   const [isWishlist, setIsWishlist] = useState(false);

//   // ✅ Check if user is logged in (helper function)
//   const checkAuth = () => {
//     const remember = localStorage.getItem("rememberMe");
//     const token =
//       (remember === "true" && localStorage.getItem("token")) ||
//       (remember === "false" && sessionStorage.getItem("token"));

//     return !!token; // Returns true/false
//   };

//   // ✅ Add to cart
//   const handleAddToCart = async () => {
//     if (!checkAuth()) {
//       nav("/signIn");
//       return;
//     }

//     postData({
//       endPoint: `/cart`,
//       payload: {
//         productId: product._id,
//         size: product.sizes?.[0],
//         color: product.colors?.[0],
//         quantity: 1,
//       },
//       onSuccess: (response) => {
//         console.log("Added to cart:", response);
//       },
//       onError: (error) => {
//         console.log("Error adding to cart:", error);
//       },
//     });
//   };

//   // ✅ Add to wishlist
//   const handleAddToWishlist = async () => {
//     if (!checkAuth()) {
//       nav("/signIn");
//       return;
//     }

//     setIsWishlist(true);
//     console.log("❤️ handleAddToWishlist fired");
//     postData({
//       endPoint: `/users/wishlist`,
//       payload: { productId: product._id },
//       onSuccess: (response) => {
//         console.log("Added to wishlist:", response);
//       },
//       onError: (error) => {
//         showErrorToast(error.response?.data?.message || error.message);
//         console.log("Error adding to wishlist:", error);
//         setIsWishlist(false); // Reset on error
//       },
//     });
//   };

//   // ✅ Remove from wishlist
//   const handleRemoveFromWishlist = async () => {
//     if (!checkAuth()) {
//       nav("/signIn");
//       return;
//     }

//     deleteData({
//       endPoint: `/users/wishlist/${product._id}`,
//       onSuccess: (response) => {
//         console.log("Removed from wishlist:", response);
//         setIsWishlist(false);
//         product.isInWishlist = false;
//       },
//       onError: (error) => {
//         showErrorToast(error.response?.data?.message || error.message);
//         console.log("Error removing from wishlist:", error);
//       },
//     });
//   };

//   // ✅ Toggle wishlist
//   const toggleWishlist = () => {
//     if (product.isInWishlist || isWishlist) {
//       handleRemoveFromWishlist();
//     } else {
//       handleAddToWishlist();
//     }
//   };

//   // ✅ Render
//   return (
//     <div
//       className="relative bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all group cursor-pointer"
//       onClick={() => nav(`/product/${product._id}`)}
//     >
//       {/* Image */}
//       <div className="relative overflow-hidden">
//         <img
//           src={product.images?.[0] || ""}
//           alt={product.name}
//           className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
//         />

//         {/* Heart button */}
//         <button
//           type="button"
//           className={`absolute top-4 right-4 w-10 h-10 ${
//             product.isInWishlist || isWishlist
//               ? "bg-pink-500 text-white"
//               : "bg-white hover:text-white hover:bg-orange-500"
//           } rounded-full flex items-center justify-center transition-colors z-20`}
//           onClick={(e) => {
//             e.preventDefault();
//             e.stopPropagation(); // ✅ Stops parent navigation
//             toggleWishlist(); // ✅ Clean toggle function
//           }}
//         >
//           <Heart
//             size={18}
//             className={`${
//               product.isInWishlist || isWishlist ? "fill-white" : ""
//             }`}
//           />
//         </button>

//         {/* Age tag */}
//         {product.age && (
//           <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
//             {product.age}
//           </span>
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
//       </div>

//       {/* Info */}
//       <div className="p-5 relative z-10">
//         <div className="flex items-center gap-2 mb-2">
//           <Star size={16} className="text-yellow-400 fill-yellow-400" />
//           <span className="text-sm font-medium text-gray-700">
//             {product.rating || 0}
//           </span>
//         </div>

//         <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>

//         <div className="flex items-center justify-between">
//           <span className="text-xl font-bold text-orange-600">
//             ₹{product.price}
//           </span>

//           {/* Add to cart button */}
//           <button
//             type="button"
//             className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-colors z-20"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation(); // ✅ Stops parent navigation
//               handleAddToCart(); // ✅ Direct call to cart function
//             }}
//           >
//             <ShoppingBag size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { deleteData, postData } from "@/Services";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "./Toast";

const ProductCard = ({ product }) => {
  const nav = useNavigate();
  // ✅ Initialize state from prop
  const [isWishlist, setIsWishlist] = useState(product.isInWishlist || false);

  // ✅ Check if user is logged in (helper function)
  const checkAuth = () => {
    const remember = localStorage.getItem("rememberMe");
    const token =
      (remember === "true" && localStorage.getItem("token")) ||
      (remember === "false" && sessionStorage.getItem("token"));

    return !!token; // Returns true/false
  };

  // ✅ Add to cart
  const handleAddToCart = async () => {
    if (!checkAuth()) {
      nav("/signIn");
      return;
    }

    postData({
      endPoint: `/cart`,
      payload: {
        productId: product._id,
        size: product.sizes?.[0],
        color: product.colors?.[0],
        quantity: 1,
      },
      onSuccess: (response) => {
        console.log("Added to cart:", response);
      },
      onError: (error) => {
        console.log("Error adding to cart:", error);
      },
    });
  };

  // ✅ Add to wishlist
  const handleAddToWishlist = async () => {
    if (!checkAuth()) {
      nav("/signIn");
      return;
    }

    setIsWishlist(true); // Update state immediately for optimistic UI
    console.log("❤️ handleAddToWishlist fired");

    postData({
      endPoint: `/users/wishlist`,
      payload: { productId: product._id },
      onSuccess: (response) => {
        console.log("Added to wishlist:", response);
      },
      onError: (error) => {
        showErrorToast(error.response?.data?.message || error.message);
        console.log("Error adding to wishlist:", error);
        setIsWishlist(false); // Revert on error
      },
    });
  };

  // ✅ Remove from wishlist
  const handleRemoveFromWishlist = async () => {
    if (!checkAuth()) {
      nav("/signIn");
      return;
    }

    setIsWishlist(false); // Update state immediately for optimistic UI

    deleteData({
      endPoint: `/users/wishlist/${product._id}`,
      onSuccess: (response) => {
        console.log("Removed from wishlist:", response);
      },
      onError: (error) => {
        showErrorToast(error.response?.data?.message || error.message);
        console.log("Error removing from wishlist:", error);
        setIsWishlist(true); // Revert on error
      },
    });
  };

  // ✅ Toggle wishlist
  const toggleWishlist = () => {
    if (isWishlist) {
      handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
    }
  };

  // ✅ Render
  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all group cursor-pointer"
      onClick={() => nav(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.images?.[0] || ""}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Heart button */}
        <button
          type="button"
          className={`absolute top-4 right-4 w-10 h-10 ${
            isWishlist
              ? "bg-pink-500 text-white"
              : "bg-white hover:text-white hover:bg-orange-500"
          } rounded-full flex items-center justify-center transition-colors z-20`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // ✅ Stops parent navigation
            toggleWishlist(); // ✅ Clean toggle function
          }}
        >
          <Heart size={18} className={`${isWishlist ? "fill-white" : ""}`} />
        </button>

        {/* Age tag */}
        {product.age && (
          <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            {product.age}
          </span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>

      {/* Info */}
      <div className="p-5 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-gray-700">
            {product.rating || 0}
          </span>
        </div>

        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            ₹{product.price}
          </span>

          {/* Add to cart button */}
          <button
            type="button"
            className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-colors z-20"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // ✅ Stops parent navigation
              handleAddToCart(); // ✅ Direct call to cart function
            }}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
