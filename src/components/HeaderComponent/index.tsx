import { useNavigate, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useStore } from "../../context/StoreContext";
import "./index.css";
import { stores } from "../../api/mockData.json"

export default function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { state } = useStore();

    const cartItemCount = state.cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const pathParts = pathname.split("/").filter(Boolean);
    const storeId = pathParts[0];

    const store = stores.find((s) => s.id === storeId);

    const handleCartClick = () => {
        navigate(`/cart`);
    };

    return (
        <header className="header">
            {store ? (
                <div className="store-header" onClick={() => navigate("/")}>
                    <img src={store.logo} alt={store.name} className="store-logo" />
                    <h1 className="store-name">{store.name}</h1>
                </div>
            ) : (
                <h1 className="title" onClick={() => navigate("/")}>Home</h1>
            )}

            <div className="icons" onClick={handleCartClick}>
                <FiShoppingCart className="cart-icon" />
                {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                )}
            </div>
        </header>
    );
}