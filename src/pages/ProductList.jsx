import { useState } from "react";
import ProductCard from "../components/ProductCard";
import BackButton from "../components/BackButton";

function ProductList({ products }) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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