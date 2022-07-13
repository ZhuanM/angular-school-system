import { createReducer, on, Action } from '@ngrx/store';
import * as AssignScheduleActions from './assign-schedule.actions';

export interface State {
  classTeachers: any,
  schools: any
}

export const initialState: State = {
  classTeachers: null,
  schools: null,
}

const _assignScheduleReducer = createReducer(
  initialState,

  on(
    AssignScheduleActions.getClassTeachersSuccess,
    (state, action) => ({
      ...state,
      classTeachers: action.classTeachers
    })
  ),

  on(
    AssignScheduleActions.getAllSchoolsSuccess,
    (state, action) => ({
      ...state,
      schools: action.schools
    })
  ),
);

export function assignScheduleReducer(state: State, action: Action) {
  return _assignScheduleReducer(state, action);
}
