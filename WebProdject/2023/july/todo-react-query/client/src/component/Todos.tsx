import { Stack, Button, ButtonGroup } from '@chakra-ui/react';
import TodoList from './TodoList';
import { TodosStatus } from '../types/todosType';
import { useState } from 'react';

const Todos = () => {
   const [view, setView] = useState<TodosStatus>('all');

   return (
      <Stack>
         <ButtonGroup>
            <Button variant={view === 'all' ? 'outline' : 'solid'} onClick={() => setView('all')}>
               all
            </Button>
            <Button variant={view === 'open' ? 'outline' : 'solid'} onClick={() => setView('open')}>
               open
            </Button>
            <Button
               variant={view === 'completed' ? 'outline' : 'solid'}
               onClick={() => setView('completed')}>
               completed
            </Button>
         </ButtonGroup>

         <TodoList status={view} />
      </Stack>
   );
};

export default Todos;
