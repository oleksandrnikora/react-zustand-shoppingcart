import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <NavBar />
      <Container className="mb-4">
        <Routes>
          <Route path="/react-zustand-shoppingcart" element={<Home />} />
          <Route path="/react-zustand-shoppingcart/store" element={<Store />} />
          <Route path="/react-zustand-shoppingcart/about" element={<About />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Cart />
    </>
  );
}

export default App;
