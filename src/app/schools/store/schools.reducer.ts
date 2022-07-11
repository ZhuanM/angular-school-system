import { createReducer, on, Action } from '@ngrx/store';
import * as SchoolsActions from './schools.actions';

export interface State {
  schools: any
}

export const initialState: State = {
  schools: null
}

const _schoolsReducer = createReducer(

  initialState,
  
  on(
    SchoolsActions.getAllSchoolsSuccess,
    (state, action) => ({
      ...state,
      schools: action.schools
    })
  ),
);

export function schoolsReducer(state: State, action: Action) {
  return _schoolsReducer(state, action);
}
