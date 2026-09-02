import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import heroBg from './assets/hero-bg.svg';
import './App.css';

function LandingPage() {
  return (
    <main className="landing" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="landing-panel">
        <p className="eyebrow">A neighborhood greenhouse, online</p>
        <h1>Paradise Nursery</h1>
        <AboutUs />
        <Link to="/products" className="btn btn-primary get-started">
          Get Started
        </Link>
      </div>
    </main>
  );
}

function ProductsPage() {
  return (
    <>
      <Header />
      <ProductList />
    </>
  );
}

function CartPage() {
  return (
    <>
      <Header />
      <CartItem />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}
