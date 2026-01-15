import { useQuery, useMutation } from '@apollo/client';
import './App.css';
import { useEffect, useState } from 'react';
import { GET_ALL_USERS, GET_ONE_USERS } from './query/user';
import { CREATE_USER } from './mutation/user';

function App() {
   const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
   const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USERS, {
      variables: { id: 1 },
   });
   const [users, setUsers] = useState([]);
   const [newUser] = useMutation(CREATE_USER);

   const [username, setUsername] = useState('');
   const [age, setAge] = useState(0);

   useEffect(() => {
      if (!loading) {
         setUsers(data.getAllUsers);
      }
   }, [data]);

   const addUser = (e) => {
      e.preventDefault();
      newUser({
         variables: {
            input: {
               username,
               age: Number(age),
            },
         },
      }).then(({ data }) => {
         setUsers([...users, data.createUser]);
         setUsername('');
         setAge(0);
      });
   };
   console.log(oneUser);

   const getAll = (e) => {
      e.preventDefault();
      refetch();
   };

   if (loading) {
      return <h1>Loading...</h1>;
   }
   if (error) {
      return <h1>Error!</h1>;
   }

   return (
      <div className="App">
         <form>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
            <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
            <div className="btns">
               <button onClick={addUser}>Создать</button>
               <button onClick={getAll}>Получить</button>
            </div>
         </form>
         <div>
            {users.map((user) => (
               <div key={user.id} className="user">
                  {user.id}: {user?.username} {user?.age}
               </div>
            ))}
         </div>
      </div>
   );
}

export default App;
