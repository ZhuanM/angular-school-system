import { createAction, props } from '@ngrx/store';

export const getGrades = createAction(
  '[Grades Component] Get Grades',
  props<{
    role: string,
    studentId?: any,
    parentId?: any,
    teacherId?: any
    schoolId?: any,
  }>()
);

export const getGradesSuccess = createAction(
  '[Grades Component] Get Grades Success',
  props<{
    grades: any
  }>()
);

export const createGrade = createAction(
  '[Grades Component] Create Grade',
  props<{
    grade: any
  }>()
);

export const createGradeSuccess = createAction(
  '[Grades Component] Create Grade Success',
);

export const updateGrade = createAction(
  '[Grades Component] Update Grade',
  props<{
    grade: any
  }>()
);

export const updateGradeSuccess = createAction(
  '[Grades Component] Update Grade Success',
);

export const deleteGrade = createAction(
  '[Grades Component] Delete Grade',
  props<{
    gradeId: any
  }>()
);

export const deleteGradeSuccess = createAction(
  '[Grades Component] Delete Grade Success',
);