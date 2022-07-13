import { createReducer, on, Action } from '@ngrx/store';
import * as AssignClassActions from './assign-class.actions';

export interface State {
  classTeachers: any,
  schools: any
}

export const initialState: State = {
  classTeachers: null,
  schools: null,
}

const _assignClassReducer = createReducer(
  initialState,

  on(
    AssignClassActions.getClassTeachersSuccess,
    (state, action) => ({
      ...state,
      classTeachers: action.classTeachers
    })
  ),

  on(
    AssignClassActions.getAllSchoolsSuccess,
    (state, action) => ({
      ...state,
      schools: action.schools
    })
  ),
);

export function assignClassReducer(state: State, action: Action) {
  return _assignClassReducer(state, action);
}
