import { createAction, props } from '@ngrx/store';

export const getAllTeachers = createAction(
  '[Teachers Component] Get All Teachers'
);

export const getAllTeachersSuccess = createAction(
  '[Teachers Component] Get All Teachers Success',
  props<{
    teachers: any
  }>()
);

export const createTeacher = createAction(
  '[Teachers Component] Create Teacher',
  props<{
    teacher: any
  }>()
);

export const createTeacherSuccess = createAction(
  '[Teachers Component] Create Teacher Success',
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