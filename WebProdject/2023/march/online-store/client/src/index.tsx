import ReactDOM from 'react-dom/client';
import { createContext } from 'react';

import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';

export interface StoreContext {
   user: UserStore;
   device: DeviceStore;
}

export const Context = createContext<StoreContext | null>(null);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <Context.Provider
      value={{
         user: new UserStore(),
         device: new DeviceStore(),
      }}>
      <App />
   </Context.Provider>,
);
