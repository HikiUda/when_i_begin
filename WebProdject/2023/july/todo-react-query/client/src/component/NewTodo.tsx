import { Button, Input, Stack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createTodo } from '../http/todos';
import { TodosType } from '../types/todosType';

const NewTodo = () => {
   const [content, setContent] = useState('');

   const client = useQueryClient();

   const { mutate: create } = useMutation({
      mutationFn: createTodo,

      onSuccess: (newTodo) => {
         client.setQueriesData<TodosType[]>(['todos', 'all'], (oldTodos) => {
            return [...(oldTodos || []), newTodo];
         });
         client.invalidateQueries({
            queryKey: ['todos', 'all'],
            refetchType: 'none',
         });
      },
   });

   const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      if (content) {
         create(content);
         setContent('');
      }
   };

   return (
      <form onSubmit={submit}>
         <Stack direction="row">
            <Input
               value={content}
               onChange={(event) => setContent(event.target.value)}
               placeholder="new todo..."
            />
            <Button type="submit">Add todo</Button>
         </Stack>
      </form>
   );
};

export default NewTodo;
