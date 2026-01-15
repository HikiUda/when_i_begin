import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';

const rootElm = document.getElementById('root');

if (rootElm) {
   const root = ReactDOM.createRoot(rootElm);
   root.render(
      <BrowserRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>,
   );
}
