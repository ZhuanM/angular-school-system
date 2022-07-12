import { createReducer, on, Action } from '@ngrx/store';
import * as SchoolActions from './school.actions';

export interface State {
  schoolName: string,
  schoolAddress: string,
}

export const initialState: State = {
  schoolName: null,
  schoolAddress: null,
}

const _schoolReducer = createReducer(
  initialState,

  on(
    SchoolActions.getSchoolSuccess,
    (state, action) => ({
      ...state,
      schoolName: action.name,
      schoolAddress: action.schoolAddress
    })
  ),
);

export function schoolReducer(state: State, action: Action) {
  return _schoolReducer(state, action);
}
