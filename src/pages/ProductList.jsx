import { useState } from "react";
import ProductCard from "../components/ProductCard";
import BackButton from "../components/BackButton";

function ProductList({ products, loading }) {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");
  const [stockFilter, setStockFilter] = useState("all");

  const resetFilters = () => {
    setSearch("");
    setPriceFilter("all");
    setSortPrice("default");
    setStockFilter("all");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under10" && product.price < 10000) ||
      (priceFilter === "10to20" &&
        product.price >= 10000 &&
        product.price <= 20000) ||
      (priceFilter === "over20" && product.price > 20000);

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

  return (
    <>
      <BackButton />

      <div className="page">
        <h1>Daftar Makanan Surplus</h1>
        <p>Pilih makanan surplus yang tersedia di sekitar kamu.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Cari makanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          {/* Filter Harga */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Semua Harga</option>
            <option value="under10">Di bawah Rp10.000</option>
            <option value="10to20">Rp10.000 - Rp20.000</option>
            <option value="over20">Di atas Rp20.000</option>
          </select>

          {/* Urutkan Harga */}
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
          >
            <option value="default">Urutan Default</option>
            <option value="lowToHigh">Harga Terendah</option>
            <option value="highToLow">Harga Tertinggi</option>
          </select>

          {/* Filter Stok */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">Semua Produk</option>
            <option value="available">Tersedia</option>
            <option value="outOfStock">Stok Habis</option>
          </select>

          {/* Reset Filter */}
          <button
            className="reset-filter-button"
            onClick={resetFilters}
          >
            Reset Filter
          </button>
        </div>

        {loading ? (
          <p className="loading-message">Memuat produk...</p>
        ) : (
          <div className="product-grid">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p>Makanan tidak ditemukan.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductList;