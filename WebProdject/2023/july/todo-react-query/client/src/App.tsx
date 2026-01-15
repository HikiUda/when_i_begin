import React from 'react';
import './App.css';
import Todos from './component/Todos';
import NewTodo from './component/NewTodo';
import { Stack } from '@chakra-ui/react';

function App() {
   return (
      <div className="wrapper">
         <Stack>
            <NewTodo />
            <Todos />
         </Stack>
      </div>
   );
}

export default App;
