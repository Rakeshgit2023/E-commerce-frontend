import { ArrowRight } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// // Hero Banner Component
// const HeroBanner = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
//         <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
//         <div className="relative z-10">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             Dress Your Little Stars ✨
//           </h2>
//           <p className="text-lg mb-6 text-white/90 max-w-xl">
//             Explore adorable collections for kids! From party wear to everyday
//             comfort, find the perfect outfit for your little ones.
//           </p>
//           <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
//             Shop Now
//             <ArrowRight size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default HeroBanner;

const HeroBanner = () => {
  const nav = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Dress Your Little Stars ✨",
      description:
        "Explore adorable collections for kids! From party wear to everyday comfort, find the perfect outfit for your little ones.",
      bgGradient: "from-orange-500 to-amber-500",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
      action: () => nav("/category/Girls Fashion"),
    },
    {
      title: "New Season Arrivals 🎉",
      description:
        "Discover the latest trends in kids fashion. Fresh styles, vibrant colors, and premium quality for your precious ones.",
      bgGradient: "from-pink-500 to-rose-500",
      image:
        "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800",
      action: () => nav("/category/Boys Fashion"),
    },
    {
      title: "Back to School Sale 📚",
      description:
        "Get ready for the new term! Comfortable uniforms, trendy casuals, and everything your child needs at amazing prices.",
      bgGradient: "from-blue-500 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800",
      action: () => nav("/category/School Wear"),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        {/* Slides */}
        <div className="relative h-[400px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

                {/* Content Container */}
                <div className="relative h-full flex items-center">
                  <div className="w-full px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="text-white z-10">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        {slide.title}
                      </h2>
                      <p className="text-base md:text-lg mb-6 text-white/90 max-w-xl">
                        {slide.description}
                      </p>
                      <button
                        onClick={slide.action}
                        className="bg-white text-orange-600 px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        Shop Now
                        <ArrowRight size={18} />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="hidden md:block ">
                      <div className="flex justify-end">
                        <img
                          src={slide.image}
                          alt="Banner"
                          className="w-[80%] h-[300px] object-cover rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all rounded-full ${
                index === currentSlide
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
