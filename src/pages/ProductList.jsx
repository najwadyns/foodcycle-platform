import { useState } from "react";
import ProductCard from "../components/ProductCard";
import BackButton from "../components/BackButton";

function ProductList({ products }) {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

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

  return matchesSearch && matchesPrice;
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
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Semua Harga</option>
            <option value="under10">Di bawah Rp10.000</option>
            <option value="10to20">Rp10.000 - Rp20.000</option>
            <option value="over20">Di atas Rp20.000</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Makanan tidak ditemukan.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;