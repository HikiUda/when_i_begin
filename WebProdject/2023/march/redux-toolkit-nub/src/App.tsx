import { useEffect } from 'react';

import './App.css';
import PostContainer from './components/PostContainer';
import PostContainer2 from './components/PostContainer2';
import { useAppDispatch, useAppSelector } from './hook/redux';
import { fetchUsers } from './store/reducers/ActionCreators';

function App() {
   // const dispatch = useAppDispatch();
   // const { error, isLoading, users } = useAppSelector((state) => state.userReducer);

   // useEffect(() => {
   //    dispatch(fetchUsers());
   // }, []);

   return (
      <div className="App">
         {/* {isLoading && <h1>Loading...</h1>}
         {error && <h1>{error}</h1>}
         {JSON.stringify(users, null, 2)}
         <div></div> */}
         <div style={{ display: 'flex', gap: '20px' }}>
            <PostContainer />
            <PostContainer2 />
         </div>
      </div>
   );
}

export default App;
