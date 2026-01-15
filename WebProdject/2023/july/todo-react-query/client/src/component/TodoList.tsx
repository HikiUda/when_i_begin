import { Alert, AlertIcon, AlertTitle, List, ListItem, Spinner } from '@chakra-ui/react';
import { TodosStatus } from '../types/todosType';
import useTodosQuery from '../hooks/useTodosQuery';
import TodoItem from './TodoItem';

type TodoListProps = {
   status: TodosStatus;
};

const TodoList: React.FC<TodoListProps> = ({ status }) => {
   const queryTodos = useTodosQuery(status);

   if (queryTodos.isError) {
      return (
         <Alert status="error">
            <AlertIcon />
            {queryTodos.error instanceof Error && (
               <AlertTitle>{queryTodos.error.message}</AlertTitle>
            )}
         </Alert>
      );
   }
   if (queryTodos.isLoading) {
      return <Spinner size="xl" />;
   }
   return (
      <List>
         {queryTodos.data.map((todo) => (
            <ListItem>
               <TodoItem key={todo.id} todo={todo} />
            </ListItem>
         ))}
      </List>
   );
};

export default TodoList;
