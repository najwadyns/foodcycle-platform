import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>FoodCycle</h2>

      <div className="nav-links">
        <Link to="/home">
        Home
        </Link>
        <Link to="/products">Produk</Link>
        <Link to="/orders">Checkout</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;