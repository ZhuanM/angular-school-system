import { createAction, props } from '@ngrx/store';

export const getSubjects = createAction(
  '[Subjects Component] Get Subjects',
  props<{
    role: string,
    teacherId?: any
  }>()
);

export const getSubjectsSuccess = createAction(
  '[Subjects Component] Get Subjects Success',
  props<{
    subjects: any
  }>()
);

export const createSubject = createAction(
  '[Subjects Component] Create Subject',
  props<{
    subject: any
  }>()
);

export const createSubjectSuccess = createAction(
  '[Subjects Component] Create Subject Success',
);

export const deleteSubject = createAction(
  '[Subjects Component] Delete Subject',
  props<{
    subjectId: any
  }>()
);

export const deleteSubjectSuccess = createAction(
  '[Subjects Component] Delete Subject Success',
);