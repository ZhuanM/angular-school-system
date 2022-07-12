import { createAction, props } from '@ngrx/store';

export const getStudents = createAction(
  '[Students Component] Get Students',
  props<{
    role: string,
    teacherId?: any,
    schoolId?: any,
  }>()
);

export const getStudentsSuccess = createAction(
  '[Students Component] Get Students Success',
  props<{
    students: any
  }>()
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