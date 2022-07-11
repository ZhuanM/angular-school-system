import { createReducer, on, Action } from '@ngrx/store';
import * as SchoolActions from './school.actions';

export interface State {
  schoolName: string,
}

export const initialState: State = {
  schoolName: null,
}

const _schoolReducer = createReducer(
  initialState,

  on(
    SchoolActions.getSchoolNameSuccess,
    (state, action) => ({
      ...state,
      schoolName: action.name
    })
  ),
);

export function schoolReducer(state: State, action: Action) {
  return _schoolReducer(state, action);
}
