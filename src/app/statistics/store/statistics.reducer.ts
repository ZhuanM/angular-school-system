import { createReducer, on, Action } from '@ngrx/store';
import * as StatisticsActions from './statistics.actions';

export interface State {
  averageGrade: any,
  totalStudents: any,
  totalTeachers: any,
}

export const initialState: State = {
  averageGrade: null,
  totalStudents: null,
  totalTeachers: null,
}

const _statisticsReducer = createReducer(
  initialState,

  on(
    StatisticsActions.getStatisticsSuccess,
    (state, action) => ({
      ...state,
      averageGrade: action.averageGrade,
      totalStudents: action.totalStudents,
      totalTeachers: action.totalTeachers
    })
  ),
);

export function statisticsReducer(state: State, action: Action) {
  return _statisticsReducer(state, action);
}
