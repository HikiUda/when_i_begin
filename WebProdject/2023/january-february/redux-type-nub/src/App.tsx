import TodoList from './components/TodoList';
import UserList from './components/UserList';

const App = () => {
   return (
      <div className="App">
         <UserList />
         <hr />
         <TodoList />
      </div>
   );
};

export default App;
