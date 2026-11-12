import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const imageUrl =
    product.image ||
    product.image_url ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";

  const price = Number(product.price || 0);
  const originalPrice = Number(
    product.original_price || product.originalPrice || product.price || 0
  );

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

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} />

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
          className={`button ${isOutOfStock ? "out-of-stock" : ""}`}
          to={`/products/${product.id}`}
        >
          {isOutOfStock ? "Stok Habis" : "Lihat Detail"}
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;