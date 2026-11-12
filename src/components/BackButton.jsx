import { Link } from "react-router-dom";

function BackButton() {
  return (
    <div className="back-container">
      <Link to="/home" className="back-button">
        ← Back
      </Link>
    </div>
  );
}

export default BackButton;