import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, onClick }) => {
  const nav = useNavigate();

  // console.log("Category in CategoryCard:", category);

  // Solution 2: Convert Tailwind color classes to actual color values
  const colorValueMap = {
    "bg-blue-500": "#3b82f6",
    "bg-orange-500": "#f97316",
    "bg-pink-500": "#ec4899",
    "bg-purple-500": "#a855f7",
    "bg-green-500": "#22c55e",
    "bg-red-500": "#ef4444",
    "bg-yellow-500": "#eab308",
    "bg-indigo-500": "#6366f1",
  };

  const backgroundColor = colorValueMap[category.color] || "#f97316";

  return (
    <div
      onClick={() => nav(`/category/${category.name}`)}
      className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group border border-orange-100"
    >
      <div
        style={{ backgroundColor }}
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <TrendingUp className="text-white" size={24} />
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
      <p className="text-sm text-gray-500">{category.productCount} items</p>
    </div>
  );
};
export default CategoryCard;
