import { Outlet } from 'react-router-dom';
import Header from '../components/base/Header';

const MainLayout = () => {
   return (
      <div className="wrapper">
         <Header />
         <Outlet />
      </div>
   );
};

export default MainLayout;
