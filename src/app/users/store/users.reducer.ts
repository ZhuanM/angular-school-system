import { createReducer, on, Action } from '@ngrx/store';
import * as UsersActions from './users.actions';

export interface State {
  users: any
}

export const initialState: State = {
  users: null
}

const _usersReducer = createReducer(

  initialState,
  
  on(
    UsersActions.getAllUsersSuccess,
    (state, action) => ({
      ...state,
      users: action.users
    })
  ),
);

export function usersReducer(state: State, action: Action) {
  return _usersReducer(state, action);
}
