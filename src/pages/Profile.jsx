// import { showErrorToast } from "@/components/Toast";
// import { getAPI, postData } from "@/Services";
// import { Heart, ShoppingBag, Star, User } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const nav = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [userData, setUserData] = useState(null);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalSpent: 0,
//     wishlistCount: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch user data and stats
//     getAPI({
//       endPoint: "/auth/me",
//       onSuccess: (response) => {
//         console.log("User data:", response);
//         setUserData(response.user);
//         setStats(response.stats);
//         setLoading(false);
//       },
//       onError: (error) => {
//         console.error("Error fetching user data:", error);
//         setLoading(false);
//         // Redirect to login if unauthorized
//         if (error.response?.status === 401) {
//           nav("/signIn");
//         }
//         showErrorToast(error.response?.data?.message || error.message);
//       },
//     });
//   }, []);
//   const updateProfile = async () => {
//     console.log("Rakesh", userData);
//     postData({
//       endPoint: "/users/update",
//       payload: { phone: userData.phone, address: userData.address },
//       onSuccess: (response) => {
//         console.log(response);
//       },
//       onError: (error) => {
//         console.log(error);
//         showErrorToast(error.response?.data?.message || error.message);
//       },
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//     nav("/signIn");
//   };

//   const statsDisplay = [
//     {
//       label: "Total Orders",
//       value: stats.totalOrders,
//       icon: ShoppingBag,
//       color: "bg-blue-500",
//     },
//     {
//       label: "Wishlist Items",
//       value: stats.wishlistCount,
//       icon: Heart,
//       color: "bg-pink-500",
//     },
//     {
//       label: "Total Spent",
//       value: `₹${stats.totalSpent.toLocaleString("en-IN")}`,
//       icon: Star,
//       color: "bg-orange-500",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600 mb-4">Unable to load profile</p>
//           <button
//             onClick={() => nav("/signIn")}
//             className="px-6 py-2 bg-orange-500 text-white rounded-lg"
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       {/* Header with gradient background */}
//       <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 mb-8 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
//         <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
//         <div className="relative flex items-center gap-6">
//           <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl">
//             {userData.avatar && userData.avatar !== "default-avatar.png" ? (
//               <img
//                 src={userData.avatar}
//                 alt={userData.name}
//                 className="w-full h-full rounded-full object-cover"
//               />
//             ) : (
//               <User size={48} className="text-orange-600" />
//             )}
//           </div>
//           <div className="text-white">
//             <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
//             <p className="text-lg text-white/90 mb-1">{userData.email}</p>
//             <p className="text-sm text-white/80">
//               Member since{" "}
//               {new Date(userData.createdAt).toLocaleDateString("en-US", {
//                 month: "long",
//                 year: "numeric",
//               })}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {statsDisplay.map((stat, i) => (
//           <div
//             key={i}
//             className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-xl transition-all"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
//                 <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
//               </div>
//               <div
//                 className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center`}
//               >
//                 <stat.icon className="text-white" size={28} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Tab Navigation */}
//       <div className="bg-white rounded-2xl p-2 border border-orange-100 mb-8 flex gap-2">
//         <button
//           onClick={() => setActiveTab("profile")}
//           className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
//             activeTab === "profile"
//               ? "bg-orange-500 text-white shadow-lg"
//               : "text-gray-600 hover:bg-orange-50"
//           }`}
//         >
//           Personal Info
//         </button>
//         <button
//           onClick={() => setActiveTab("orders")}
//           className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
//             activeTab === "orders"
//               ? "bg-orange-500 text-white shadow-lg"
//               : "text-gray-600 hover:bg-orange-50"
//           }`}
//         >
//           Order History
//         </button>
//         <button
//           onClick={() => setActiveTab("wishlist")}
//           className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
//             activeTab === "wishlist"
//               ? "bg-orange-500 text-white shadow-lg"
//               : "text-gray-600 hover:bg-orange-50"
//           }`}
//         >
//           Wishlist
//         </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === "profile" && (
//         <div className="bg-white rounded-2xl p-8 border border-orange-100">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Personal Information
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={userData.name}
//                 readOnly
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-transparent transition-all"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 value={userData.phone}
//                 name="phone"
//                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={userData.email}
//                 readOnly
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-transparent transition-all"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Delivery Address
//               </label>
//               <textarea
//                 rows="3"
//                 value={userData.address}
//                 name="address"
//                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <button
//               className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
//               onClick={updateProfile}
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={handleLogout}
//               className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}

//       {activeTab === "orders" && (
//         <div className="bg-white rounded-2xl p-8 border border-orange-100">
//           {stats.totalOrders === 0 ? (
//             <div className="text-center py-12">
//               <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-600 text-lg font-medium mb-2">
//                 No orders yet
//               </p>
//               <p className="text-gray-500 mb-6">
//                 Start shopping to see your orders here
//               </p>
//               <button
//                 onClick={() => nav("/")}
//                 className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
//               >
//                 Start Shopping
//               </button>
//             </div>
//           ) : (
//             <p className="text-gray-600">
//               You have {stats.totalOrders} order
//               {stats.totalOrders !== 1 ? "s" : ""}
//             </p>
//           )}
//         </div>
//       )}

//       {activeTab === "wishlist" && (
//         <div>
//           {userData.wishlist && userData.wishlist.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {userData.wishlist.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-xl transition-all group"
//                 >
//                   <div className="relative overflow-hidden">
//                     <img
//                       src={
//                         product.images?.[0] || "https://via.placeholder.com/300"
//                       }
//                       alt={product.name}
//                       className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <button className="absolute top-4 right-4 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
//                       <Heart size={18} className="fill-white" />
//                     </button>
//                     <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                       {product.age}
//                     </span>
//                   </div>
//                   <div className="p-5">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Star
//                         size={16}
//                         className="text-yellow-400 fill-yellow-400"
//                       />
//                       <span className="text-sm font-medium text-gray-700">
//                         {product.rating || 0}
//                       </span>
//                     </div>
//                     <h3 className="font-semibold text-gray-800 mb-2">
//                       {product.name}
//                     </h3>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-bold text-orange-600">
//                         ₹{product.price}
//                       </span>
//                       <button
//                         onClick={() => nav(`/product/${product._id}`)}
//                         className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm"
//                       >
//                         View
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white rounded-2xl p-8 border border-orange-100">
//               <div className="text-center py-12">
//                 <Heart size={64} className="text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-600 text-lg font-medium mb-2">
//                   Your wishlist is empty
//                 </p>
//                 <p className="text-gray-500 mb-6">
//                   Save your favorite items to buy them later
//                 </p>
//                 <button
//                   onClick={() => nav("/")}
//                   className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
//                 >
//                   Browse Products
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { deleteData, getAPI, postData } from "@/Services";
import { Heart, ShoppingBag, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    wishlistCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data and stats
    getAPI({
      endPoint: "/auth/me",
      onSuccess: (response) => {
        console.log("User data:", response);
        setUserData(response.user);
        setStats(response.stats);
        setLoading(false);
      },
      onError: (error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
        // Redirect to login if unauthorized
        if (error.response?.status === 401) {
          nav("/signIn");
        }
        showErrorToast(error.response?.data?.message || error.message);
      },
    });
  }, []);

  const updateProfile = async () => {
    console.log("Rakesh", userData);
    postData({
      endPoint: "/users/update",
      payload: { phone: userData.phone, address: userData.address },
      onSuccess: (response) => {
        console.log(response);
        showSuccessToast(response.message);
      },
      onError: (error) => {
        console.log(error);
        showErrorToast(error.response?.data?.message || error.message);
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    nav("/signIn");
  };

  const statsDisplay = [
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      label: "Wishlist Items",
      value: stats.wishlistCount,
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      label: "Total Spent",
      value: `₹${stats.totalSpent.toLocaleString("en-IN")}`,
      icon: Star,
      color: "bg-orange-500",
    },
  ];

  // ✅ Remove from wishlist with optimistic UI update
  const handleRemoveFromWishlist = async (productId) => {
    // Optimistically remove from UI
    setUserData((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((item) => item._id !== productId),
    }));

    // Update wishlist count
    setStats((prev) => ({
      ...prev,
      wishlistCount: Math.max(0, prev.wishlistCount - 1),
    }));

    deleteData({
      endPoint: `/users/wishlist/${productId}`,
      onSuccess: (response) => {
        console.log("Removed from wishlist:", response);
      },
      onError: (error) => {
        showErrorToast(error.response?.data?.message || error.message);
        console.log("Error removing from wishlist:", error);

        // Revert on error - refetch user data
        getAPI({
          endPoint: "/auth/me",
          onSuccess: (response) => {
            setUserData(response.user);
            setStats(response.stats);
          },
          onError: (err) => {
            console.error("Error refetching user data:", err);
          },
        });
      },
    });
  };

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

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load profile</p>
          <button
            onClick={() => nav("/signIn")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative flex items-center gap-6">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl">
            {userData.avatar && userData.avatar !== "default-avatar.png" ? (
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={48} className="text-orange-600" />
            )}
          </div>
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
            <p className="text-lg text-white/90 mb-1">{userData.email}</p>
            <p className="text-sm text-white/80">
              Member since{" "}
              {new Date(userData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsDisplay.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div
                className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <stat.icon className="text-white" size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-2 border border-orange-100 mb-8 flex gap-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            activeTab === "profile"
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-600 hover:bg-orange-50"
          }`}
        >
          Personal Info
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            activeTab === "orders"
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-600 hover:bg-orange-50"
          }`}
        >
          Order History
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            activeTab === "wishlist"
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-600 hover:bg-orange-50"
          }`}
        >
          Wishlist
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl p-8 border border-orange-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={userData.name}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={userData.phone}
                name="phone"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={userData.email}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-transparent transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <textarea
                rows="3"
                value={userData.address}
                name="address"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
              onClick={updateProfile}
            >
              Save Changes
            </button>
            <button
              onClick={handleLogout}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl p-8 border border-orange-100">
          {stats.totalOrders === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium mb-2">
                No orders yet
              </p>
              <p className="text-gray-500 mb-6">
                Start shopping to see your orders here
              </p>
              <button
                onClick={() => nav("/")}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <p className="text-gray-600">
              You have {stats.totalOrders} order
              {stats.totalOrders !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {activeTab === "wishlist" && (
        <div>
          {userData.wishlist && userData.wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userData.wishlist.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-xl transition-all group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/300"
                      }
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      onClick={() => nav(`/product/${product._id}`)}
                    />
                    <button
                      className="absolute top-4 right-4 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(product._id);
                      }}
                    >
                      <Heart size={18} className="fill-white" />
                    </button>
                    {product.age && (
                      <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.age}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {product.rating || 0}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-orange-600">
                        ₹{product.price}
                      </span>
                      <button
                        onClick={() => nav(`/product/${product._id}`)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-orange-100">
              <div className="text-center py-12">
                <Heart size={64} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium mb-2">
                  Your wishlist is empty
                </p>
                <p className="text-gray-500 mb-6">
                  Save your favorite items to buy them later
                </p>
                <button
                  onClick={() => nav("/")}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
