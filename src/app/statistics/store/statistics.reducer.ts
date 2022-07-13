import { createReducer, on, Action } from '@ngrx/store';
import * as StatisticsActions from './statistics.actions';

export interface State {
  statistics: any,
  averageGrade: any,
  totalStudents: any,
  totalTeachers: any,
}

export const initialState: State = {
  statistics: null,
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

  on(
    StatisticsActions.getAllStatisticsSuccess,
    (state, action) => ({
      ...state,
      statistics: action.statistics,
    })
  ),
);

export function statisticsReducer(state: State, action: Action) {
  return _statisticsReducer(state, action);
}
