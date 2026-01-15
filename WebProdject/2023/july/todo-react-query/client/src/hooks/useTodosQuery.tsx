import { useQuery } from '@tanstack/react-query';
import { TodosStatus } from '../types/todosType';
import { fetchTodos } from '../http/todos';

const useTodosQuery = (status: TodosStatus) => {
   return useQuery({
      queryKey: ['todos', status],
      queryFn: () => fetchTodos(status),
   });
};

export default useTodosQuery;
