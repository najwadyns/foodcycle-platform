import { useState } from "react";
import ProductCard from "../components/ProductCard";
import BackButton from "../components/BackButton";

function ProductList({ products }) {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");

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
        </div>

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
      </div>
    </>
  );
}

export default ProductList;