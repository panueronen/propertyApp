import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Navbar from './components/Navbar';
import Maintenance from './components/Maintenance';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/maintenance" element={<Maintenance />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
