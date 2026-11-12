import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import OrderList from "./pages/Orderlist";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Checkout from "./pages/Checkout";
import SellerDashboard from "./pages/SellerDashboard";
import EditProduct from "./pages/EditProduct";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("ERROR FETCH PRODUCTS:", error);
      return;
    }

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("ERROR DELETE PRODUCT:", error);
      alert("Gagal menghapus produk dari Supabase.");
      return;
    }

    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route 
        path="/home"
        element={<Home products={products} />}
        />

        <Route
          path="/products"
          element={<ProductList products={products} />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetail products={products} />}
        />

        <Route
          path="/add-product"
          element={<AddProduct addProduct={addProduct} />}
        />

        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/checkout/:id"
          element={<Checkout products={products} />}
        />

        <Route
          path="/orders"
          element={<OrderList />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/seller-dashboard"
          element={
            <SellerDashboard
              products={products}
              deleteProduct={deleteProduct}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;