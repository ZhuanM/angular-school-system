import { createReducer, on, Action } from '@ngrx/store';
import * as GradesActions from './grades.actions';

export interface State {
  grades: any
}

export const initialState: State = {
  grades: null
}

const _gradesReducer = createReducer(

  initialState,
  
  on(
    GradesActions.getGradesSuccess,
    (state, action) => ({
      ...state,
      grades: action.grades
    })
  ),
);

export function gradesReducer(state: State, action: Action) {
  return _gradesReducer(state, action);
}
