import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import BackButton from "../components/BackButton";

function Checkout({ products }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  const [buyerName, setBuyerName] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Produk tidak ditemukan</h2>
          <Link className="button" to="/products">
            Kembali ke daftar produk
          </Link>
        </div>
      </div>
    );
  }

  const price = Number(product.price || 0);
  const stock = Number(product.quantity || 0);
  const serviceFee = 1000;
  const subtotal = price * Number(quantity || 1);
  const total = subtotal + serviceFee;

  const imageUrl =
    product.image ||
    product.image_url ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";

  const expiredTime = product.expired_time || product.expiredTime || "-";

  const handleCheckout = async () => {
    if (!buyerName) {
      alert("Nama pembeli wajib diisi.");
      return;
    }

    if (Number(quantity) < 1) {
      alert("Jumlah pesanan minimal 1.");
      return;
    }

    if (Number(quantity) > stock) {
      alert("Jumlah pesanan melebihi stok.");
      return;
    }

    const { error } = await supabase.from("orders").insert([
      {
        product_id: product.id,
        buyer_name: buyerName,
        quantity: Number(quantity),
        total_price: total,
        status: "pending",
      },
    ]);

    if (error) {
      console.log("ERROR CHECKOUT:", error);
      alert("Gagal membuat pesanan.");
      return;
    }

    const newStock = stock - Number(quantity);

    const { error: stockError } = await supabase
      .from("products")
      .update({
        quantity: newStock,
        status: newStock === 0 ? "Habis" : product.status,
      })
      .eq("id", product.id);

    if (stockError) {
      console.log("ERROR UPDATE STOK:", stockError);
      alert("Pesanan masuk, tapi stok gagal diperbarui.");
      return;
    }

    alert("Pesanan berhasil dikonfirmasi!");
    setBuyerName("");
    setQuantity(1);
  };

  return (
  <>
    <BackButton />
    <div className="page checkout-page">
      <div className="checkout-header">
        <div>
          <p className="section-label">FoodCycle Checkout</p>
          <h1>Konfirmasi Pesanan</h1>
          <p>
            Cek lagi detail makanan surplus sebelum pesanan kamu dikonfirmasi.
          </p>
        </div>

        <Link className="secondary-button" to="/products">
          Kembali
        </Link>
      </div>

      <div className="checkout-layout">
        <div className="checkout-card product-summary">
          <img
            className="checkout-image"
            src={imageUrl}
            alt={product.name}
          />

          <div className="checkout-product-info">
            <span className="status-badge">{product.status}</span>
            <h2>{product.name}</h2>
            <p>{product.description}</p>

            <div className="info-grid">
              <div>
                <span>Penjual</span>
                <strong>{product.seller}</strong>
              </div>

              <div>
                <span>Lokasi</span>
                <strong>{product.location}</strong>
              </div>

              <div>
                <span>Stok</span>
                <strong>{stock}</strong>
              </div>

              <div>
                <span>Batas konsumsi</span>
                <strong>{expiredTime}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-card order-summary">
          <h2>Data Pesanan</h2>

          <label>Nama Pembeli</label>
          <input
            type="text"
            placeholder="Contoh: Amanda"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />

          <label>Jumlah Pesanan</label>
          <input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className="price-detail">
            <div>
              <span>Harga satuan</span>
              <strong>Rp{price.toLocaleString("id-ID")}</strong>
            </div>

            <div>
              <span>Subtotal</span>
              <strong>Rp{subtotal.toLocaleString("id-ID")}</strong>
            </div>

            <div>
              <span>Biaya layanan</span>
              <strong>Rp{serviceFee.toLocaleString("id-ID")}</strong>
            </div>

            <div className="total-row">
              <span>Total</span>
              <strong>Rp{total.toLocaleString("id-ID")}</strong>
            </div>
          </div>

          <button className="button checkout-button" onClick={handleCheckout}>
            Konfirmasi Pesanan
          </button>

          <p className="checkout-note">
            Pesanan akan masuk ke tabel orders dan stok produk otomatis berkurang.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;