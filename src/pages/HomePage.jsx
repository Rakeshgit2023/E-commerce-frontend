// import CategoryCard from "@/components/CategoryCard";
// import HeroBanner from "@/components/HeroBanner";
// import ProductCard from "@/components/ProductCard";
// import { ArrowRight } from "lucide-react";

// // Home Page Component
// const HomePage = ({ categories, products }) => {
//   return (
//     <>
//       <HeroBanner />

//       <div className="max-w-7xl mx-auto px-6 mb-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           Shop by Category
//         </h2>
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {categories.map((cat, i) => (
//             <CategoryCard key={i} category={cat} />
//           ))}
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 pb-12">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Trending Kids Wear
//           </h2>
//           <button className="text-orange-600 font-medium flex items-center gap-2 hover:gap-3 transition-all">
//             View All
//             <ArrowRight size={18} />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
// export default HomePage;

import CategoryCard from "@/components/CategoryCard";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

const HomePage = ({ categories, products, lastProductRef }) => {
  return (
    <>
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={i} category={cat} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Trending Kids Wear
          </h2>
          {/* <button className="text-orange-600 font-medium flex items-center gap-2 hover:gap-3 transition-all">
            View All
            <ArrowRight size={18} />
          </button> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            // Attach ref to the last product card for infinite scroll detection
            if (products.length === index + 1) {
              return (
                <div key={product._id} ref={lastProductRef}>
                  <ProductCard product={product} />
                </div>
              );
            } else {
              return <ProductCard key={product._id} product={product} />;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
