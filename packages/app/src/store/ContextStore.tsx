import { createContext } from 'react';
import { userInitialState, userAction } from './reducers';

const ContextStore = createContext<{ userState: typeof userInitialState; userDispatch: (action: userAction) => void }>({
  userState: userInitialState,
  userDispatch: () => {},
});

export default ContextStore;
