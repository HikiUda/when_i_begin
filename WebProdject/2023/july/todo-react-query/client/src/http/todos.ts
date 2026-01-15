import axios from 'axios';
import { TodosStatus, TodosType } from '../types/todosType';

const BASE_URL = 'http://localhost:3004/todos';

export const fetchTodos = async (status: TodosStatus) => {
   try {
      const params: { completed?: boolean } = {};
      if (status !== 'all') {
         params.completed = status === 'completed';
      }

      const response = await axios.get<TodosType[]>(BASE_URL, { params });
      return response.data;
   } catch (e) {
      throw e;
   }
};

export const toggleTodo = async (todo: TodosType) => {
   try {
      const response = await axios.put<TodosType>(`${BASE_URL}/${todo.id}`, {
         ...todo,
         completed: !todo.completed,
      });
      return response.data;
   } catch (e) {
      throw e;
   }
};

export const createTodo = async (content: string) => {
   try {
      const response = await axios.post<TodosType>(BASE_URL, { content, completed: false });
      return response.data;
   } catch (e) {
      throw e;
   }
};
