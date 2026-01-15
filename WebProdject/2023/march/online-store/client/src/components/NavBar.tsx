import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
   const context = useContext(Context);
   const navigate = useNavigate();

   const logOut = () => {
      context?.user.setUser({});
      context?.user.setIsAuth(false);
      localStorage.setItem('token', '');
      navigate(SHOP_ROUTE);
   };

   return (
      <Navbar bg="primary" variant="dark">
         <Container>
            <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
               КупиДивайс
            </NavLink>
            {context?.user.isAuth ? (
               <Nav style={{ color: 'white' }} className="ml-auto">
                  <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>
                     Админ панель
                  </Button>
                  <Button variant={'outline-light'} onClick={() => navigate(BASKET_ROUTE)}>
                     Корзина
                  </Button>
                  <Button variant={'outline-light'} className="ml-4" onClick={() => logOut()}>
                     Выйти
                  </Button>
               </Nav>
            ) : (
               <Nav style={{ color: 'white' }} className="ml-auto">
                  <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>
                     Авторизация
                  </Button>
               </Nav>
            )}
         </Container>
      </Navbar>
   );
});

export default NavBar;
