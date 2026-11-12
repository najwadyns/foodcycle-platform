import ProductCard from "../components/ProductCard";
import BackButton from "../components/BackButton";

function ProductList({ products }) {
  return (
    <>
      <BackButton />
      <div className="page">
        <h1>Daftar Makanan Surplus</h1>
      <p>Pilih makanan surplus yang tersedia di sekitar kamu.</p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </>
  );
}

export default ProductList;
