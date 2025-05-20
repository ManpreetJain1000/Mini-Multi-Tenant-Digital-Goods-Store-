import { useStore } from "../../../context/StoreContext";
import { useParams } from "react-router-dom";
import "../ProductComponent/index.css";
import { products } from "../../../api/mockData.json"

export default function FilterSort() {
  const { dispatch } = useStore();
  const { storeId } = useParams();

  const subCategories = Array.from(
    new Set(
      products
        .filter((p) => p.storeId === storeId)
        .map((p) => p.subCategory)
    )
  );

  return (
    <div className="filter-sort-container">
      <select
        onChange={(e) =>
          dispatch({ type: "SET_FILTERS", payload: { subCategory: e.target.value } })
        }
        className="filter-select"
      >
        <option value="">All Subcategories</option>
        {subCategories.map((subCategory) => (
          <option key={subCategory} value={subCategory}>
            {subCategory}
          </option>
        ))}
      </select>

      <select
        onChange={(e) =>
          dispatch({ type: "SET_FILTERS", payload: { sort: e.target.value } })
        }
        className="filter-select"
      >
        <option value="">Default</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
      </select>
    </div>
  );
}