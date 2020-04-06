import { useReducer } from 'react';
import { userReducer, userInitialState } from './reducers/user';

const useStore = () => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  return { userState, userDispatch };
};

export default useStore;
