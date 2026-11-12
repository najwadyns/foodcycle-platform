import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BackButton from "../components/BackButton";

function OrderList() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("ERROR FETCH ORDERS:", error);
      return;
    }

    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
    <BackButton />
    <div className="page">
      <div className="orders-header">
        <h1>Checkout / Pesanan</h1>
        <p>Daftar pesanan yang sudah dikonfirmasi oleh pembeli.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>Belum ada pesanan.</p>
          <p>
            Pesanan akan muncul di sini setelah pembeli klik tombol
            <strong> Konfirmasi Pesanan</strong>.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>ID Produk</th>
                <th>Nama Pembeli</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product_id}</td>
                  <td>{order.buyer_name}</td>
                  <td>{order.quantity}</td>
                  <td>
                    Rp{Number(order.total_price).toLocaleString("id-ID")}
                  </td>
                  <td>
                    <span className="order-status">{order.status}</span>
                  </td>
                  <td>
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString("id-ID")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
}

export default OrderList;