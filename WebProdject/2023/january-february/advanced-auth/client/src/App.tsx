import { FC, useEffect, useContext, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/responses/IUser';
import UserService from './service/UserService';

const App: FC = () => {
   const [users, setUsers] = useState<IUser[]>([]);
   const { store } = useContext(Context);
   useEffect(() => {
      if (localStorage.getItem('token')) {
         store.checkAuth();
      }
   }, []);

   const getUsers = async () => {
      try {
         const responses = await UserService.fetchUsers();
         setUsers(responses.data);
      } catch (e) {
         console.log(e);
      }
   };

   if (store.isLoading) {
      return <div>Loading...</div>;
   }

   if (!store.isAuth) {
      return (
         <>
            <LoginForm />
            <div>
               <button onClick={getUsers}>Get Users</button>
            </div>
            <ul>
               {users.map((user) => (
                  <li key={user.email}>{user.email}</li>
               ))}
            </ul>
         </>
      );
   }

   return (
      <div>
         <h1>{store.isAuth ? `User is authorized ${store.user.email}` : 'You is unauthorize'}</h1>
         <h2>{store.user.isActivated ? 'You activated account' : 'Activate your account'}</h2>
         <button onClick={() => store.logout()}>Logout</button>
         <div>
            <button onClick={getUsers}>Get Users</button>
         </div>
         <ul>
            {users.map((user) => (
               <li key={user.email}>{user.email}</li>
            ))}
         </ul>
      </div>
   );
};

export default observer(App);
