import { createReducer, on, Action } from '@ngrx/store';
import * as ClassesActions from './classes.actions';

export interface State {
  classes: any
}

export const initialState: State = {
  classes: null
}

const _classesReducer = createReducer(

  initialState,
  
  on(
    ClassesActions.getClassesSuccess,
    (state, action) => ({
      ...state,
      classes: action.classes
    })
  ),
);

export function classesReducer(state: State, action: Action) {
  return _classesReducer(state, action);
}
