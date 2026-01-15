import React, { useEffect } from 'react';
import { useAction } from '../hook/useAction';
import { useTypedSelector } from '../hook/useTypedSelector';

const TodoList: React.FC = () => {
   const { setTodoPage, fetchTodo } = useAction();
   const { loading, error, todos, page, limit } = useTypedSelector((state) => state.todo);

   useEffect(() => {
      fetchTodo(page, limit);
   }, [page]);

   const pages = [1, 2, 3, 4, 5];

   if (loading) {
      return <h1>Loading...</h1>;
   }
   if (error) {
      return <h1>{error}</h1>;
   }

   return (
      <div>
         {todos.map((todo) => (
            <div key={todo.id}>
               {todo.id} - {todo.title}
            </div>
         ))}
         <div>
            {pages.map((p) => (
               <button onClick={() => setTodoPage(p)} key={p}>
                  {p}
               </button>
            ))}
         </div>
      </div>
   );
};

export default TodoList;
