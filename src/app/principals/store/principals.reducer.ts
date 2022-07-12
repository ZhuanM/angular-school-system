import { createReducer, on, Action } from '@ngrx/store';
import * as PrincipalsActions from './principals.actions';

export interface State {
  principals: any
}

export const initialState: State = {
  principals: null
}

const _principalsReducer = createReducer(

  initialState,
  
  on(
    PrincipalsActions.getPrincipalsSuccess,
    (state, action) => ({
      ...state,
      principals: action.principals
    })
  ),
);

export function principalsReducer(state: State, action: Action) {
  return _principalsReducer(state, action);
}
