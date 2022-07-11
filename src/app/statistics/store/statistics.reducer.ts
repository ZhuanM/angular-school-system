import { createReducer, on, Action } from '@ngrx/store';
import * as StatisticsActions from './statistics.actions';

export interface State {
  statistics: any,
}

export const initialState: State = {
  statistics: null,
}

const _statisticsReducer = createReducer(
  initialState,

  on(
    StatisticsActions.getStatisticsSuccess,
    (state, action) => ({
      ...state,
      statistics: action.statistics
    })
  ),
);

export function statisticsReducer(state: State, action: Action) {
  return _statisticsReducer(state, action);
}
