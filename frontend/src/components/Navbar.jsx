import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/properties">Properties</Link></li>
        <li><Link to="/tenants">Tenants</Link></li>
        <li><Link to="/maintenance">Maintenance</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
