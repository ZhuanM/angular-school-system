import { createReducer, on, Action } from '@ngrx/store';
import * as SubjectsActions from './subjects.actions';

export interface State {
  subjects: any
}

export const initialState: State = {
  subjects: null
}

const _subjectsReducer = createReducer(

  initialState,
  
  on(
    SubjectsActions.getAllSubjectsSuccess,
    (state, action) => ({
      ...state,
      subjects: action.subjects
    })
  ),
);

export function subjectsReducer(state: State, action: Action) {
  return _subjectsReducer(state, action);
}
