import { createReducer, on, Action } from '@ngrx/store';
import * as AbsencesActions from './absences.actions';

export interface State {
  absences: any
}

export const initialState: State = {
  absences: null
}

const _absencesReducer = createReducer(

  initialState,
  
  on(
    AbsencesActions.getAbsencesSuccess,
    (state, action) => ({
      ...state,
      absences: action.absences
    })
  ),
);

export function absencesReducer(state: State, action: Action) {
  return _absencesReducer(state, action);
}
