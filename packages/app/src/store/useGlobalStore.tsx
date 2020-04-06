import { useContext } from 'react';
import ContextStore from './ContextStore';

const useGlobalStore = () => useContext(ContextStore);

export default useGlobalStore;
