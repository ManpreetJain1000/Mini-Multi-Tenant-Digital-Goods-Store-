import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function CheckoutPage() {
    const { state, dispatch } = useStore();
    const [submitted, setSubmitted] = useState(false);
    const [orderDetails, setOrderDetails] = useState<any[]>([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        contact: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const totalPrice = orderDetails.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.contact.trim()) {
            newErrors.contact = "Contact number is required";
        } else if (!/^\d{10}$/.test(form.contact)) {
            newErrors.contact = "Invalid contact number (10 digits)";
        }
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setOrderDetails([...state.cart]);
            dispatch({ type: "CLEAR_CART" });
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <div className="checkout-summary">
                <div className="checkout-header">
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
                    <h2>🧾 Order Summary</h2>
                    <div className="spacer"></div>
                </div>
                <div className="summary-info">
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Contact:</strong> {form.contact}</p>
                    <p><strong>Address:</strong> {form.address}</p>
                </div>

                <h3>🛒 Items:</h3>
                <div className="summary-items">
                    {orderDetails.map((item) => (
                        <div key={item.id} className="summary-item">
                            <img src={item.image} alt={item.title} />
                            <div className="summary-details">
                                <h4>{item.title}</h4>
                                <p>Qty: {item.quantity}</p>
                                <p>Price: ${item.price * (item.quantity || 1)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
                <p className="success-msg">✅ Your order has been placed successfully!</p>
            </div>
        );
    }

    return (
        <div className="checkout-form">
            <div className="checkout-header">
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
                <h2>Checkout</h2>
                <div className="spacer"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </label>

                <label>
                    Contact Number:
                    <input
                        type="number"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    />
                    {errors.contact && <span className="error">{errors.contact}</span>}
                </label>

                <label>
                    Address:
                    <textarea
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </label>
                <button type="submit" className="submit-btn">Place Order</button>
            </form>
        </div>
    );
}