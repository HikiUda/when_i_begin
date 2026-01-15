import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userApi';

const App = observer(() => {
   const context = useContext(Context);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      try {
         check()
            .then((data) => {
               context?.user.setUser(data as {});
               context?.user.setIsAuth(true);
            })
            .finally(() => setLoading(false));
      } catch (e: any) {
         alert(e.response.data.message);
      }
   }, []);

   if (loading) {
      return <Spinner animation={'grow'} />;
   }
   return (
      <BrowserRouter>
         <NavBar />
         <AppRouter />
      </BrowserRouter>
   );
});

export default App;
