import axios from 'axios';
import useRequest from '../hook/useRequest';

const Request = () => {
   const [todos, isLoading, error] = useRequest(fetchTodos);

   function fetchTodos() {
      return axios.get(`https://jsonplaceholder.typicode.com/todos`);
   }

   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (error) {
      return <h1>Error</h1>;
   }

   return (
      <div>
         {todos &&
            todos.map((todo) => (
               <div
                  key={todo.id}
                  style={{ margin: 15, padding: 30, border: '2px solid lightblue' }}>
                  {todo.id}. {todo.title}
               </div>
            ))}
      </div>
   );
};

export default Request;
