import { useState } from "react";
import { supabase } from "../supabaseClient";
import BackButton from "../components/BackButton";

function AddProduct({ addProduct }) {
  const [form, setForm] = useState({
  name: "",
  seller: "",
  category: "",
  price: "",
  originalPrice: "",
  quantity: "",
  location: "",
  expiredTime: "",
  description: "",
  image: "",
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.seller ||
      !form.category ||
      !form.price ||
      !form.quantity ||
      !form.location ||
      !form.expiredTime 
    ) {
      alert("Mohon lengkapi data produk utama.");
      return;
    }

    if (Number(form.price) <= 0) {
      alert("Harga diskon harus lebih dari 0.");
      return;
    }

    if (form.originalPrice && Number(form.originalPrice) < Number(form.price)) {
      alert("Harga normal tidak boleh lebih kecil dari harga diskon.");
      return;
    }

    if (Number(form.quantity) <= 0) {
      alert("Stok produk harus lebih dari 0.");
      return;
    }

    const newProduct = {
      name: form.name,
      seller: form.seller,
      category: form.category,
      price: Number(form.price),
      original_price: Number(form.originalPrice || form.price),
      quantity: Number(form.quantity),
      location: form.location,
      expired_time: form.expiredTime,
      description: form.description,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      status: "Tersedia",
    };

    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select();

    if (error) {
      console.log("ERROR TAMBAH PRODUK:", error);
      alert("Gagal tambah produk ke Supabase.");
      return;
    }

    addProduct(data[0]);

    alert("Produk berhasil ditambahkan!");

    setForm({
      name: "",
      seller: "",
      category: "",
      price: "",
      originalPrice: "",
      quantity: "",
      location: "",
      expiredTime: "",
      description: "",
      image: "",
    });
  };

  return (
  <>
    <BackButton />
      <div className="page">
      <h1>Tambah Produk Surplus</h1>
      <p>Penjual dapat menambahkan makanan surplus yang masih layak konsumsi.</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nama produk"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="seller"
          placeholder="Nama penjual"
          value={form.seller}
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Pilih Kategori</option>
          <option value="Makanan Siap Saji">Makanan Siap Saji</option>
          <option value="Roti & Bakery">Roti & Bakery</option>
          <option value="Buah & Sayur">Buah & Sayur</option>
          <option value="Minuman">Minuman</option>
          <option value="Frozen Food">Frozen Food</option>
        </select>

        <input
          name="price"
          type="number"
          placeholder="Harga diskon"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="originalPrice"
          type="number"
          placeholder="Harga normal"
          value={form.originalPrice}
          onChange={handleChange}
        />

        <input
          name="quantity"
          type="number"
          placeholder="Jumlah stok"
          value={form.quantity}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Lokasi"
          value={form.location}
          onChange={handleChange}
        />

        <input
          name="expiredTime"
          placeholder="Waktu kedaluwarsa"
          value={form.expiredTime}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="URL gambar produk, opsional"
          value={form.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Deskripsi produk"
          value={form.description}
          onChange={handleChange}
        />

        <button className="button" type="submit">
          Tambah Produk
        </button>
      </form>
    </div>
    </>
  );
}

export default AddProduct;
