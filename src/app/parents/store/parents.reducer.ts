import { createReducer, on, Action } from '@ngrx/store';
import * as ParentsActions from './parents.actions';

export interface State {
  parents: any
}

export const initialState: State = {
  parents: null
}

const _parentsReducer = createReducer(

  initialState,
  
  on(
    ParentsActions.getParentsSuccess,
    (state, action) => ({
      ...state,
      parents: action.parents
    })
  ),
);

export function parentsReducer(state: State, action: Action) {
  return _parentsReducer(state, action);
}
