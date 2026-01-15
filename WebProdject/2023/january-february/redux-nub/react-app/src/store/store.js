import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { cashReducer } from './cashReducer';
import { customerReducer } from './customersReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rooteRedux = combineReducers({
   cash: cashReducer,
   customers: customerReducer,
});

export const store = createStore(rooteRedux, composeWithDevTools(applyMiddleware(thunk)));
