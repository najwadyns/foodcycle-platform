import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function EditProduct() {

const { id } = useParams();
const navigate=useNavigate();

const [form,setForm]=useState({
name:"",
seller:"",
price:"",
quantity:"",
location:"",
description:""
});

useEffect(()=>{
fetchProduct();
},[id]);

const fetchProduct=async()=>{

const {data}=await supabase
.from("products")
.select("*")
.eq("id",id)
.single();

if(data){
setForm(data);
}

};

const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

};

const updateProduct=async(e)=>{
e.preventDefault();

const { error } = await supabase
.from("products")
.update({
  name: form.name,
  seller: form.seller,
  price: form.price,
  quantity: form.quantity,
  location: form.location,
  description: form.description
})
.eq("id",id);

if(error){
   alert("Gagal update produk");
   return;
}

alert("Produk berhasil diupdate");
navigate("/seller-dashboard");

};

return(

<div className="page">
<h1>Edit Produk</h1>

<form className="form" onSubmit={updateProduct}>

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

<input
name="price"
placeholder="Harga"
value={form.price}
onChange={handleChange}
/>

<input
name="quantity"
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

<textarea
name="description"
placeholder="Deskripsi produk"
value={form.description}
onChange={handleChange}
/>

<button type="submit" className="button">
Update Produk
</button>

</form>

</div>

)

}

export default EditProduct;