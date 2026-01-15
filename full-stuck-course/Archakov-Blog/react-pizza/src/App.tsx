import { Routes, Route } from 'react-router-dom';

//import Header from './components/base/Header';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PizzaPage from './pages/PizzaPage';
import './scss/app.scss';

const App = () => {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="pizza/:id" element={<PizzaPage />} />
            <Route path="*" element={<NotFound />} />
         </Route>
      </Routes>
   );
};

export default App;
