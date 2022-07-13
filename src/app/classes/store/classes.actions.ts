import { createAction, props } from '@ngrx/store';

export const getClasses = createAction(
  '[Classes Component] Get Classes',
  props<{
    role: string,
    classId?: any
  }>()
);

export const getClassesSuccess = createAction(
  '[Classes Component] Get Classes Success',
  props<{
    classes: any
  }>()
);

export const deleteClass = createAction(
  '[Classes Component] Delete Class',
  props<{
    teacherClassId: any
  }>()
);

export const deleteClassSuccess = createAction(
  '[Classes Component] Delete Class Success',
);