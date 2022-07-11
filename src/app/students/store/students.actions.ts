import { createAction, props } from '@ngrx/store';

export const getAllStudents = createAction(
  '[Students Component] Get All Students'
);

export const getAllStudentsSuccess = createAction(
  '[Students Component] Get All Students Success',
  props<{
    students: any
  }>()
);

export const createStudent = createAction(
  '[Students Component] Create Student',
  props<{
    student: any
  }>()
);

export const createStudentSuccess = createAction(
  '[Students Component] Create Student Success',
);

export const updateStudent = createAction(
  '[Students Component] Update Student',
  props<{
    student: any
  }>()
);

export const updateStudentSuccess = createAction(
  '[Students Component] Update Student Success',
);

export const deleteStudent = createAction(
  '[Students Component] Delete Student',
  props<{
    studentId: any
  }>()
);

export const deleteStudentSuccess = createAction(
  '[Students Component] Delete Student Success',
);