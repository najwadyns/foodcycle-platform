# FoodCycle Platform

FoodCycle Platform adalah aplikasi web marketplace makanan surplus yang menghubungkan penjual dengan pembeli untuk membantu mengurangi food waste dan menyediakan makanan dengan harga yang lebih terjangkau.

## Project Overview

FoodCycle dikembangkan sebagai platform untuk mempermudah penjual menawarkan makanan surplus yang masih layak konsumsi. Pembeli dapat melihat produk yang tersedia, mencari makanan berdasarkan nama, menggunakan filter harga dan stok, melihat informasi kedaluwarsa, hingga melakukan pemesanan melalui checkout.

Project ini merupakan pengembangan lanjutan dari aplikasi FoodCycle dengan fokus pada peningkatan user experience, validasi pemesanan, product filtering, order management, dan responsive design.

## Features

### Authentication
- Register akun
- Login akun
- Supabase Authentication

### Product Marketplace
- Menampilkan daftar makanan surplus
- Search produk berdasarkan nama
- Filter berdasarkan harga
- Sorting harga dari terendah hingga tertinggi
- Filter produk berdasarkan ketersediaan stok
- Reset filter
- Load more products
- Informasi harga asli dan harga setelah diskon
- Persentase diskon
- Informasi jumlah stok
- Status batas konsumsi
- Responsive product grid

### Product Detail & Wishlist
- Melihat detail produk
- Add/remove favorite product
- Wishlist disimpan menggunakan localStorage
- Indikator produk yang sudah difavoritkan

### Checkout
- Input nama pembeli
- Pemilihan jumlah produk
- Validasi nama dan quantity
- Validasi stok
- Perhitungan subtotal
- Service fee
- Total pembayaran
- Loading state saat checkout
- Penyimpanan order ke Supabase

### Order Management
- Menampilkan riwayat pesanan
- Filter berdasarkan status pesanan
- Status pesanan:
  - Menunggu
  - Dikonfirmasi
  - Selesai
  - Dibatalkan
- Refresh data pesanan
- Informasi tanggal dan total pesanan

### User Experience
- Loading state
- Error state
- Retry button ketika gagal mengambil data
- Empty state ketika produk tidak ditemukan
- Responsive layout untuk desktop dan mobile
- Hover dan focus interaction

## Tech Stack

- React.js
- Vite
- React Router
- Supabase
- JavaScript
- HTML & CSS
- Git & GitHub

## Database

FoodCycle menggunakan Supabase untuk mengelola data aplikasi, termasuk:

- Product data
- Product stock
- Order data
- User authentication

## Application Flow

```text
User
  ↓
Login / Register
  ↓
Product Marketplace
  ↓
Search / Filter / Sort
  ↓
Product Detail
  ↓
Checkout
  ↓
Order Created
  ↓
Order List
