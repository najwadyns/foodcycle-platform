import { useState } from "react";
import ProductCard from "../components/ProductCard";
import BackButton from "../components/BackButton";

function ProductList({ products, loading, error, fetchProducts }) {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");
  const [stockFilter, setStockFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const resetFilters = () => {
    setSearch("");
    setPriceFilter("all");
    setSortPrice("default");
    setStockFilter("all");
    setVisibleCount(6);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const price = Number(product.price || 0);

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under10" && price < 10000) ||
      (priceFilter === "10to20" &&
        price >= 10000 &&
        price <= 20000) ||
      (priceFilter === "over20" && price > 20000);

    const stock = Number(product.quantity || 0);

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "available" && stock > 0) ||
      (stockFilter === "outOfStock" && stock <= 0);

    return matchesSearch && matchesPrice && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortPrice === "lowToHigh") {
      return Number(a.price) - Number(b.price);
    }

    if (sortPrice === "highToLow") {
      return Number(b.price) - Number(a.price);
    }

    return 0;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const hasMoreProducts =
    visibleCount < sortedProducts.length;

  return (
    <>
      <BackButton />

      <div className="page">
        <h1>Daftar Makanan Surplus</h1>
        <p>
          Pilih makanan surplus yang tersedia di sekitar kamu.
        </p>

        {error ? (
          <div className="error-message">
            <p>{error}</p>

            <button
              className="retry-button"
              onClick={fetchProducts}
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            <div className="search-box">
              <input
                type="text"
                placeholder="Cari makanan..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(6);
                }}
              />
            </div>

            <div className="filter-box">
              <select
                value={priceFilter}
                onChange={(e) => {
                  setPriceFilter(e.target.value);
                  setVisibleCount(6);
                }}
              >
                <option value="all">Semua Harga</option>
                <option value="under10">
                  Di bawah Rp10.000
                </option>
                <option value="10to20">
                  Rp10.000 - Rp20.000
                </option>
                <option value="over20">
                  Di atas Rp20.000
                </option>
              </select>

              <select
                value={sortPrice}
                onChange={(e) => {
                  setSortPrice(e.target.value);
                  setVisibleCount(6);
                }}
              >
                <option value="default">
                  Urutan Default
                </option>
                <option value="lowToHigh">
                  Harga Terendah
                </option>
                <option value="highToLow">
                  Harga Tertinggi
                </option>
              </select>

              <select
                value={stockFilter}
                onChange={(e) => {
                  setStockFilter(e.target.value);
                  setVisibleCount(6);
                }}
              >
                <option value="all">Semua Produk</option>
                <option value="available">
                  Tersedia
                </option>
                <option value="outOfStock">
                  Stok Habis
                </option>
              </select>

              <button
                className="reset-filter-button"
                onClick={resetFilters}
              >
                Reset Filter
              </button>
            </div>

            {loading ? (
              <p className="loading-message">
                Memuat produk...
              </p>
            ) : sortedProducts.length === 0 ? (
              <div className="empty-product-state">
                <div className="empty-product-icon">
                  🔍
                </div>

                <h2>Makanan tidak ditemukan</h2>

                <p>
                  Tidak ada produk yang sesuai dengan
                  pencarian atau filter kamu.
                </p>

                <button
                  className="reset-filter-button"
                  onClick={resetFilters}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                <div className="product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                {hasMoreProducts && (
                  <div className="load-more-container">
                    <button
                      className="load-more-button"
                      onClick={() =>
                        setVisibleCount(
                          (prev) => prev + 6
                        )
                      }
                    >
                      Muat Lebih Banyak
                    </button>
                  </div>
                )}

                {!hasMoreProducts &&
                  sortedProducts.length > 6 && (
                    <p className="all-products-message">
                      Semua produk sudah ditampilkan.
                    </p>
                  )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ProductList;