import { useStore, type Product } from "../../../context/StoreContext";
import "./index.css";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useStore();

  return (
    <div className="product-card">
      <img src={product.image}  alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
}