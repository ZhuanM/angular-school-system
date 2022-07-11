import { createReducer, on, Action } from '@ngrx/store';
import * as StudentsActions from './students.actions';

export interface State {
  students: any
}

export const initialState: State = {
  students: null
}

const _studentsReducer = createReducer(

  initialState,
  
  on(
    StudentsActions.getAllStudentsSuccess,
    (state, action) => ({
      ...state,
      students: action.students
    })
  ),
);

export function studentsReducer(state: State, action: Action) {
  return _studentsReducer(state, action);
}
