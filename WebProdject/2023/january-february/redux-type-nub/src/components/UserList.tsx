import React, { useEffect } from 'react';
import { useAction } from '../hook/useAction';
import { useTypedSelector } from '../hook/useTypedSelector';

const UserList: React.FC = () => {
   const { fetchUsers } = useAction();
   const { error, loading, users } = useTypedSelector((state) => state.users);

   useEffect(() => {
      fetchUsers();
   }, []);

   if (loading) {
      return <h1>Loading...</h1>;
   }
   if (error) {
      return <h1>{error}</h1>;
   }

   return (
      <div>
         {users.map((user) => (
            <div key={user.id}>{user.name}</div>
         ))}
      </div>
   );
};

export default UserList;
