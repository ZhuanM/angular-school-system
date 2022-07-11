import { createReducer, on, Action } from '@ngrx/store';
import * as ScheduleActions from './schedule.actions';

export interface State {
  schedule: any
}

export const initialState: State = {
  schedule: null
}

const _scheduleReducer = createReducer(

  initialState,
  
  on(
    ScheduleActions.getScheduleSuccess,
    (state, action) => ({
      ...state,
      schedule: action.schedule
    })
  ),
);

export function scheduleReducer(state: State, action: Action) {
  return _scheduleReducer(state, action);
}
