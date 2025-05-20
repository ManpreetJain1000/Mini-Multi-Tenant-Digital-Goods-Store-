import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "./index.css";

export default function CartPage() {
    const { state, dispatch } = useStore();
    const navigate = useNavigate();

    const totalPrice = state.cart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );

    const handleCheckout = () => {
        if (state.cart.length > 0) {
            navigate("/checkout");
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
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
                <h1 className="cart-title">Shopping Cart</h1>
                <div className="spacer"></div>
            </div>

            {state.cart.length === 0 ? (
                <div className="empty-cart">
                    <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" />
                    <h2>Your Cart is Empty</h2>
                    <p>Looks like you haven’t added anything yet.</p>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {state.cart.map((item, index) => (
                            <div key={item.id}>
                                <div className="cart-item">
                                    <img src={item.image} alt={item.title} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <div className="cart-item-header">
                                            <h2 className="cart-item-title">{item.title}</h2>
                                            <h3 className="cart-item-total-price">${(item.price * item.quantity).toFixed(2)}</h3>
                                        </div>
                                        <p className="cart-item-price">
                                            ${item.price} × {item.quantity}
                                        </p>
                                        <div className="cart-item-controls">
                                            <button
                                                onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}
                                                className="quantity-btn"
                                            >-</button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}
                                                className="quantity-btn"
                                            >+</button>
                                            <button
                                                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                                                className="remove-btn"
                                            >Remove</button>
                                        </div>
                                    </div>
                                </div>
                                {index !== state.cart.length - 1 && <hr className="cart-divider" />}
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}