import { createReducer, on, Action } from '@ngrx/store';
import * as TeachersActions from './teachers.actions';

export interface State {
  teachers: any
}

export const initialState: State = {
  teachers: null
}

const _teachersReducer = createReducer(

  initialState,
  
  on(
    TeachersActions.getTeachersSuccess,
    (state, action) => ({
      ...state,
      teachers: action.teachers
    })
  ),
);

export function teachersReducer(state: State, action: Action) {
  return _teachersReducer(state, action);
}
