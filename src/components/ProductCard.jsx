import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const imageUrl =
    product.image ||
    product.image_url ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";

  const price = Number(product.price || 0);

  const originalPrice = Number(
    product.original_price ||
      product.originalPrice ||
      product.price ||
      0
  );

  const discountPercentage =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const stock = Number(product.quantity || 0);
  const isOutOfStock = stock <= 0;

  const expiredTime =
    product.expired_time || product.expiredTime || "-";

  let expirationStatus = "Cek Batas Konsumsi";

  if (expiredTime.toLowerCase().includes("hari ini")) {
    expirationStatus = "Segera Expired";
  } else if (expiredTime.toLowerCase().includes("besok")) {
    expirationStatus = "Masih Aman";
  }

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("foodcycle-favorites")) || [];

    setIsFavorite(
      favorites.some((id) => Number(id) === Number(product.id))
    );
  }, [product.id]);

  const toggleFavorite = () => {
    const favorites =
      JSON.parse(localStorage.getItem("foodcycle-favorites")) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (id) => Number(id) !== Number(product.id)
      );

      localStorage.setItem(
        "foodcycle-favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      favorites.push(product.id);

      localStorage.setItem(
        "foodcycle-favorites",
        JSON.stringify(favorites)
      );

      setIsFavorite(true);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.name} />

        <button
          className={`favorite-button ${
            isFavorite ? "favorite-active" : ""
          }`}
          onClick={toggleFavorite}
          aria-label="Tambah ke favorit"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-content">
        <h3>{product.name}</h3>
        <p>{product.seller}</p>

        <div className="price-row">
          <span className="old-price">
            Rp{originalPrice.toLocaleString("id-ID")}
          </span>

          <strong>
            Rp{price.toLocaleString("id-ID")}
          </strong>

          {discountPercentage > 0 && (
            <span className="discount-badge">
              Diskon {discountPercentage}%
            </span>
          )}
        </div>

        <p>Stok: {stock > 0 ? stock : "Habis"}</p>

        <p>Batas konsumsi: {expiredTime}</p>

        <p
          className={`expiration-status ${
            expirationStatus === "Segera Expired"
              ? "expiring"
              : expirationStatus === "Masih Aman"
              ? "safe"
              : "unknown"
          }`}
        >
          Status: {expirationStatus}
        </p>

        <Link
          className={`button ${
            isOutOfStock ? "out-of-stock" : ""
          }`}
          to={`/products/${product.id}`}
        >
          {isOutOfStock ? "Stok Habis" : "Lihat Detail"}
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;