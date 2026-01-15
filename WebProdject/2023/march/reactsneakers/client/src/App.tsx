import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Liked from './pages/Liked';
import Purches from './pages/Purches';

const App: FC = () => {
   return (
      <div className="wrapper">
         <div className="cart__mask"></div>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/liked" element={<Liked />} />
               <Route path="/purches" element={<Purches />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
