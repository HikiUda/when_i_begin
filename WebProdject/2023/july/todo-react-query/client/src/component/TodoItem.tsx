import { Checkbox, Stack } from '@chakra-ui/react';
import { TodosType } from '../types/todosType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTodo } from '../http/todos';

type TodoItemProps = {
   todo: TodosType;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
   const client = useQueryClient();

   const { mutate: toggle } = useMutation({
      mutationFn: () => toggleTodo(todo),
      onSuccess: () => client.invalidateQueries(['todos']),
   });

   return (
      <Stack spacing={4} direction="row" onClick={() => toggle()}>
         <Checkbox isChecked={todo.completed}>{todo.content}</Checkbox>
      </Stack>
   );
};

export default TodoItem;
