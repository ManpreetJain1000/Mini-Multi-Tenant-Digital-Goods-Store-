import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { products } from "../../api/mockData.json";
import FilterSort from "./FilterSort";
import ProductCard from "./ProductComponent";

export default function Storefront() {
  const { storeId } = useParams();
  const {
    state: { filters },
  } = useStore();
  const navigate = useNavigate();

  let filtered = products.filter((p) => p.storeId === storeId);
  if (filters.subCategory) {
    filtered = filtered.filter((p) => p.subCategory === filters.subCategory);
  }
  if (filters.sort === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  }
  if (filters.sort === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="product-main-container">
      <button className="back-button" onClick={() => navigate(-1)} title="Go Back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <FilterSort />
      <div className="product-section">
        <div className="product-container">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}