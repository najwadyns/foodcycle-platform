import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BackButton from "../components/BackButton";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("ERROR FETCH ORDERS:", error);
      setLoading(false);
      return;
    }

    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "Menunggu";

      case "confirmed":
        return "Dikonfirmasi";

      case "completed":
        return "Selesai";

      case "cancelled":
        return "Dibatalkan";

      default:
        return status || "Tidak diketahui";
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "status-pending";

      case "confirmed":
        return "status-confirmed";

      case "completed":
        return "status-completed";

      case "cancelled":
        return "status-cancelled";

      default:
        return "status-unknown";
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "all") {
      return true;
    }

    return (
      order.status?.toLowerCase() === statusFilter
    );
  });

  return (
    <>
      <BackButton />

      <div className="page">
        <div className="orders-header">
          <div>
            <h1>Riwayat Pesanan</h1>

            <p>
              Lihat daftar pesanan dan status pesanan
              yang sudah dibuat.
            </p>
          </div>

          <button
            className="refresh-orders-button"
            onClick={fetchOrders}
            disabled={loading}
          >
            {loading ? "Memuat..." : "Refresh Pesanan"}
          </button>
        </div>

        <div className="order-filter">
          <label htmlFor="status-filter">
            Filter Status
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="all">
              Semua Pesanan
            </option>

            <option value="pending">
              Menunggu
            </option>

            <option value="confirmed">
              Dikonfirmasi
            </option>

            <option value="completed">
              Selesai
            </option>

            <option value="cancelled">
              Dibatalkan
            </option>
          </select>
        </div>

        {loading ? (
          <div className="orders-loading">
            <p>Memuat pesanan...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">
              📦
            </div>

            <h2>
              Tidak ada pesanan
            </h2>

            <p>
              Belum ada pesanan dengan status
              yang dipilih.
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
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>

                    <td>{order.product_id}</td>

                    <td>{order.buyer_name}</td>

                    <td>{order.quantity}</td>

                    <td>
                      Rp
                      {Number(
                        order.total_price || 0
                      ).toLocaleString("id-ID")}
                    </td>

                    <td>
                      <span
                        className={`order-status ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(
                          order.status
                        )}
                      </span>
                    </td>

                    <td>
                      {order.created_at
                        ? new Date(
                            order.created_at
                          ).toLocaleString(
                            "id-ID"
                          )
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