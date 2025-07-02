import { Link } from "react-router-dom";
import "../NavigationComponent/navigateStyles.css"; // Importing styles for navigation

const Navigate = () => (
  <nav className="navbar">
    <ul className="navbar-nav ">
      <li className="navbar-brand">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-brand">
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
);
export default Navigate;
