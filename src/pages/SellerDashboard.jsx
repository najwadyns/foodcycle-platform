import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackButton from "../components/BackButton";

function SellerDashboard({ products, deleteProduct }) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  if (!authorized) {
  return (
    <>
      <BackButton />

      <div className="page">
        <h1>Akses Penjual</h1>

        <p>
          Masukkan password untuk mengakses dashboard penjual.
        </p>

        <input
          type="password"
          placeholder="Password Penjual"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button
          className="button"
          onClick={() => {
            if (password === "foodcycle123") {
              setAuthorized(true);
            } else {
              alert("Password salah!");
            }
          }}
        >
          Masuk Dashboard
        </button>
      </div>
    </>
  );
}

  return (
    <>
      <BackButton />
    <div className="page">
      <h1>Dashboard Penjual</h1>
      <p>
        Halaman ini digunakan penjual untuk memantau dan mengelola produk yang tersedia.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/add-product" className="button">
          + Tambah Produk
        </Link>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>Rp{Number(product.price || 0).toLocaleString("id-ID")}</td>
                <td>{product.quantity}</td>
                <td>{product.location}</td>
                <td>{product.status}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default SellerDashboard;