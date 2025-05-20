import React from "react";
import { useNavigate } from "react-router-dom";
import { stores } from "../../api/mockData.json"
import "./index.css"

const StoreList: React.FC = () => {
  const navigate = useNavigate();

  const handleStoreClick = (storeId: string) => {
    navigate(`/${storeId}`);
  };

  return (
    <div className="store-main-container">
      <div className="store-section">
        <div className="store-container">
          {stores.map((store) => (
            <div
              key={store.id}
              onClick={() => handleStoreClick(store.id)}
              className="store-card"
              style={{ cursor: "pointer" }}
            >
              <img
                src={store.logo}
                alt={store.name}
                className="store-image"
              />
              <h2 className="store-title">{store.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreList;