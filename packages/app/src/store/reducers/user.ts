import { RESTORE } from './constants';

export type userAction = {
  type: string;
  payload?: object;
};

export interface userState {}

const userInitialState = {
  userId: '',
};

const userReducer = (state = userInitialState, action: userAction) => {
  const { type } = action;
  switch (type) {
    case RESTORE:
      return userInitialState;
    default:
      return state;
  }
};

export { userReducer, userInitialState };
