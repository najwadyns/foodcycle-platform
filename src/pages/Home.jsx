import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Home({ products = [] }) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSellers: 0,
    totalStock: 0,
    totalTransactions: 0,
  });

  const readyFood = products.filter(
    (p) => p.category === "Makanan Siap Saji"
  ).length;

  const bakery = products.filter(
    (p) => p.category === "Roti & Bakery"
  ).length;

  const fruits = products.filter(
    (p) => p.category === "Buah & Sayur"
  ).length;

  const drinks = products.filter(
    (p) => p.category === "Minuman"
  ).length;

  const frozenFood = products.filter(
    (p) => p.category === "Frozen Food"
  ).length;

  const fetchStats = async () => {
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("*");

    if (productError) {
      console.log("ERROR FETCH PRODUCTS STATS:", productError);
      return;
    }

    const { data: orders, error: orderError } = await supabase
      .from("orders")
      .select("*");

    if (orderError) {
      console.log("ERROR FETCH ORDERS STATS:", orderError);
      return;
    }

    const totalProducts = products.length;

    const totalStock = products.reduce((total, product) => {
      return total + Number(product.quantity || 0);
    }, 0);

    const uniqueSellers = new Set(products.map((product) => product.seller));
    const totalSellers = uniqueSellers.size;

    const totalTransactions = orders.length;

    setStats({
      totalProducts,
      totalSellers,
      totalStock,
      totalTransactions,
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <main className="home-page">
      <section className="home-hero-dashboard">
        <div className="home-left">
          <span className="welcome-badge">🌿 Selamat datang di FoodCycle</span>

          <h1>
            Kurangi Food Waste dengan <span>FoodCycle</span>
          </h1>

          <p>
            FoodCycle membantu penjual menawarkan makanan surplus yang masih
            layak konsumsi kepada pembeli dengan harga lebih terjangkau.
          </p>

          <div className="home-actions">
            <Link className="button" to="/products">
              🛍️ Lihat Produk
            </Link>
          </div>
        </div>

        <div className="home-center">
          <div className="bag-illustration">
            <div className="bag-food">🥬 🍊 🥕</div>
            <div className="recycle-icon">♻</div>
          </div>
        </div>

        <div className="home-stats">
          <div className="stat-card stat-green">
            <div className="stat-icon">🛍️</div>
            <div>
              <p>Total Produk</p>
              <h2>{stats.totalProducts}</h2>
              <span>Produk tersedia</span>
            </div>
            <small>Live</small>
          </div>

          <div className="stat-card stat-blue">
            <div className="stat-icon">👥</div>
            <div>
              <p>Total Penjual</p>
              <h2>{stats.totalSellers}</h2>
              <span>Penjual aktif</span>
            </div>
            <small>Live</small>
          </div>

          <div className="stat-card stat-yellow">
            <div className="stat-icon">📦</div>
            <div>
              <p>Total Stok Tersedia</p>
              <h2>{stats.totalStock}</h2>
              <span>Makanan layak konsumsi</span>
            </div>
            <small>Live</small>
          </div>

          <div className="stat-card stat-purple">
            <div className="stat-icon">🛒</div>
            <div>
              <p>Total Transaksi</p>
              <h2>{stats.totalTransactions}</h2>
              <span>Transaksi berhasil</span>
            </div>
            <small>Live</small>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-card">
          <div className="card-title-row">
            <h2>Kategori Populer</h2>
            <Link to="/products">Lihat Semua</Link>
          </div>

          <div className="category-list">
            <div className="category-item">
              <div className="circle-icon green-soft">🍱</div>
              <div>
                <h3>Makanan Siap Saji</h3>
                <p>{readyFood} Produk</p>
              </div>
            </div>

            <div className="category-item">
              <div className="circle-icon yellow-soft">🥐</div>
              <div>
                <h3>Roti & Bakery</h3>
                <p>{bakery} Produk</p>
              </div>
            </div>

            <div className="category-item">
              <div className="circle-icon orange-soft">🍊</div>
              <div>
                <h3>Buah & Sayur</h3>
                <p>{fruits} Produk</p>
              </div>
            </div>

            <div className="category-item">
              <div className="circle-icon purple-soft">🥤</div>
              <div>
                <h3>Minuman</h3>
                <p>{drinks} Produk</p>
              </div>
            </div>

            <div className="category-item">
              <div className="circle-icon blue-soft">❄️</div>
              <div>
                <h3>Frozen Food</h3>
                <p>{frozenFood} Produk</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-title-row">
            <h2>Produk Terbaru</h2>
            <Link to="/products">Lihat Semua</Link>
          </div>

          <div className="latest-products">
            {products.slice(0, 4).map((product) => (
              <div className="mini-product" key={product.id}>
          <img
           src={
          product.image ||
          product.image_url ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
        }
        alt={product.name}
        className="mini-product-image"
      />

      <h3>{product.name}</h3>
      <p>{product.seller}</p>

      <strong>
        Rp{Number(product.price).toLocaleString("id-ID")}
      </strong>

      <span>Tersedia</span>
    </div>
  ))}
</div>
</div>

        <div className="dashboard-card">
          <div className="card-title-row">
            <h2>Aktivitas Terbaru</h2>
            <Link to="/orders">Lihat Semua</Link>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="circle-icon green-soft">＋</div>
              <div>
                <h3>Dapur Sehat menambahkan produk baru</h3>
                <p>Nasi Ayam Teriyaki</p>
              </div>
              <span>2 menit yang lalu</span>
            </div>

            <div className="activity-item">
              <div className="circle-icon blue-soft">✎</div>
              <div>
                <h3>Bakery Happy memperbarui stok produk</h3>
                <p>Roti Gandum</p>
              </div>
              <span>15 menit yang lalu</span>
            </div>

            <div className="activity-item">
              <div className="circle-icon yellow-soft">🛒</div>
              <div>
                <h3>Transaksi baru berhasil</h3>
                <p>Salad Buah Segar</p>
              </div>
              <span>1 jam yang lalu</span>
            </div>

            <div className="activity-item">
              <div className="circle-icon purple-soft">🏪</div>
              <div>
                <h3>Fresh Bowl bergabung sebagai penjual</h3>
                <p>Selamat datang!</p>
              </div>
              <span>3 jam yang lalu</span>
            </div>
          </div>
        </div>
      </section>

      <section className="why-foodcycle">
        <h2>🌿 Mengapa FoodCycle? 🌿</h2>

        <div className="why-grid">
          <div className="why-item">
            <div className="why-icon">🍃</div>
            <div>
              <h3>Mengurangi Food Waste</h3>
              <p>Bantu mengurangi limbah makanan yang masih layak konsumsi.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon">🏷️</div>
            <div>
              <h3>Harga Lebih Terjangkau</h3>
              <p>Dapatkan makanan berkualitas dengan harga lebih murah.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon">♡</div>
            <div>
              <h3>Berdampak Positif</h3>
              <p>Setiap pembelian membantu lingkungan dan sesama.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon">🛡️</div>
            <div>
              <h3>Aman & Terpercaya</h3>
              <p>Produk melalui proses seleksi untuk memastikan kualitas.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <h2>Siap untuk berkontribusi?</h2>
          <p>
            Mulai beli makanan surplus berkualitas atau jual produk Anda
            sekarang juga!
          </p>
        </div>

        <div className="cta-buttons">
          <Link className="button" to="/products">
            🛒 Mulai Belanja
          </Link>

          <Link className="white-button" to="/seller-dashboard">
            🏪 Jadi Penjual
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;