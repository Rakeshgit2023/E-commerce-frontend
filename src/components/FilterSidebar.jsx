import { X } from "lucide-react";

const FilterSidebar = ({ showFilters, setShowFilters }) => {
  const ageGroups = ["3-5 years", "5-8 years", "8-12 years"];
  const sizes = ["S", "M", "L", "XL"];
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹1000", value: "0-1000" },
    { label: "₹1000 - ₹1500", value: "1000-1500" },
    { label: "Above ₹1500", value: "1500+" },
  ];

  return (
    <div className="w-72 bg-white rounded-2xl p-6 border border-orange-100 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button onClick={() => setShowFilters(false)} className="lg:hidden">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Age Group</h4>
          <div className="space-y-2">
            {ageGroups.map((age) => (
              <label
                key={age}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-orange-600"
                />
                <span className="text-sm text-gray-600">{age}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price"
                  className="w-4 h-4 text-orange-600"
                  defaultChecked={range.value === "all"}
                />
                <span className="text-sm text-gray-600">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-800 mb-3">Size</h4>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-sm font-medium"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors mt-6">
          Apply Filters
        </button>
      </div>
    </div>
  );
};
export default FilterSidebar;
