import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = observer(() => {
   const context = useContext(Context);

   return (
      <div>
         <Routes>
            {context?.user.isAuth &&
               authRoutes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
               ))}
            {publicRoutes.map(({ path, Component }) => (
               <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<div>Non</div>} />
         </Routes>
      </div>
   );
});

export default AppRouter;
