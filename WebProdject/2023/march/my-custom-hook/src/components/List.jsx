import { useState, useRef } from 'react';
import useScroll from '../hook/useScroll';

const List = () => {
   const [todos, setTodos] = useState([]);
   const [page, setPage] = useState(1);
   const limit = 20;

   const parentRef = useRef();
   const childRef = useRef();

   useScroll(parentRef, childRef, () => fetchTodos(page, limit));

   function fetchTodos(page, limit) {
      fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
         .then((response) => response.json())
         .then((json) => {
            setTodos((prev) => [...prev, ...json]);
            setPage((prev) => prev + 1);
         });
   }

   return (
      <div ref={parentRef} style={{ height: '80vh', overflow: 'auto' }}>
         {todos.map((todo, idx) =>
            todos.length - 1 !== idx ? (
               <div
                  key={todo.id}
                  style={{ margin: 15, padding: 30, border: '2px solid lightblue' }}>
                  {todo.id}. {todo.title}
               </div>
            ) : (
               <div
                  ref={childRef}
                  key={todo.id}
                  style={{ margin: 15, padding: 30, border: '2px solid green' }}>
                  {todo.id}. {todo.title}
               </div>
            ),
         )}
         {todos.length ? null : (
            <div ref={childRef} style={{ width: '100wv', height: 30, background: 'green' }}></div>
         )}
      </div>
   );
};

export default List;
