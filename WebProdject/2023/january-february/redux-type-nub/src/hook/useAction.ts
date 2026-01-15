import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreator from '../store/actionCreator';

export const useAction = () => {
   const dispatch = useDispatch();
   return bindActionCreators(ActionCreator, dispatch);
};
