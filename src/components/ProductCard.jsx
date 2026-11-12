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

  const expiredTime =
    product.expired_time || product.expiredTime || "-";

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} />

      <div className="product-content">
        <h3>{product.name}</h3>
        <p>{product.seller}</p>
        <p>{product.location}</p>

        <div className="price-row">
          <span className="old-price">
            Rp{originalPrice.toLocaleString("id-ID")}
          </span>

          <strong>
            Rp{price.toLocaleString("id-ID")}
          </strong>
        </div>

        <p>Stok: {product.quantity}</p>
        <p>Batas konsumsi: {expiredTime}</p>

        <Link className="button" to={`/products/${product.id}`}>
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;