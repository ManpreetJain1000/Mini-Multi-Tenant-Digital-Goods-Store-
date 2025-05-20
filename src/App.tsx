import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/HeaderComponent";
import Storefront from "./pages/ProductPage";
import CartComponent from "./pages/CartComponent";
import StoreList from "./pages/TenantStore";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<StoreList />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/:storeId" element={<Storefront />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
