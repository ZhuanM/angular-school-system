import { createAction, props } from '@ngrx/store';

export const getSchedule = createAction(
  '[Schedule Component] Get Schedule'
);

export const getScheduleSuccess = createAction(
  '[Schedule Component] Get Schedule Success',
  props<{
    schedule: any
  }>()
);

export const createSchedule = createAction(
  '[Schedule Component] Create Schedule',
  props<{
    schedule: any
  }>()
);

export const createScheduleSuccess = createAction(
  '[Schedule Component] Create Schedule Success',
);


export const deleteSchedule = createAction(
  '[Schedule Component] Delete Schedule',
  props<{
    scheduleId: any
  }>()
);

export const deleteScheduleSuccess = createAction(
  '[Schedule Component] Delete Schedule Success',
);