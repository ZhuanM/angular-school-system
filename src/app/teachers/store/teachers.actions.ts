import { createAction, props } from '@ngrx/store';

export const getTeachers = createAction(
  '[Teachers Component] Get Teachers',
  props<{
    role: string,
    schoolId: any
  }>()
);

export const getTeachersSuccess = createAction(
  '[Teachers Component] Get Teachers Success',
  props<{
    teachers: any
  }>()
);

export const updateTeacher = createAction(
  '[Teachers Component] Update Teacher',
  props<{
    teacher: any
  }>()
);

export const updateTeacherSuccess = createAction(
  '[Teachers Component] Update Teacher Success',
);

export const deleteTeacher = createAction(
  '[Teachers Component] Delete Teacher',
  props<{
    teacherId: any
  }>()
);

export const deleteTeacherSuccess = createAction(
  '[Teachers Component] Delete Teacher Success',
);