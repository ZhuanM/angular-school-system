import { createAction, props } from '@ngrx/store';

export const getAllSubjects = createAction(
  '[Subjects Component] Get All Subjects'
);

export const getAllSubjectsSuccess = createAction(
  '[Subjects Component] Get All Subjects Success',
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

export const updateSubject = createAction(
  '[Subjects Component] Update Subject',
  props<{
    subject: any
  }>()
);

export const updateSubjectSuccess = createAction(
  '[Subjects Component] Update Subject Success',
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