import { useParams, Link } from "react-router-dom";
import BackButton from "../components/BackButton";

function ProductDetail({ products }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="page">
        <h2>Produk tidak ditemukan</h2>
        <Link to="/products">Kembali ke daftar produk</Link>
      </div>
    );
  }

  const imageUrl =
    product.image ||
    product.image_url ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";

  const price = Number(product.price || 0);

  const originalPrice = Number(
    product.original_price || product.originalPrice || product.price || 0
  );

  const expiredTime = product.expired_time || product.expiredTime || "-";

  return (
    <>
    <BackButton />
    <div className="page detail-layout">
      <img className="detail-image" src={imageUrl} alt={product.name} />

      <div className="detail-content">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        <p>
          <strong>Penjual:</strong> {product.seller}
        </p>
        <p>
          <strong>Lokasi:</strong> {product.location}
        </p>
        <p>
          <strong>Stok:</strong> {product.quantity}
        </p>
        <p>
          <strong>Batas konsumsi:</strong> {expiredTime}
        </p>
        <p>
          <strong>Status:</strong> {product.status}
        </p>

        <div className="price-row detail-price">
          <span className="old-price">
            Rp{originalPrice.toLocaleString("id-ID")}
          </span>

          <strong>
            Rp{price.toLocaleString("id-ID")}
          </strong>
        </div>

        <Link className="button" to={`/checkout/${product.id}`}>
          Pesan Sekarang
        </Link>
      </div>
    </div>
    </>
  );
}

export default ProductDetail;