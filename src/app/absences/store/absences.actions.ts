import { createAction, props } from '@ngrx/store';

export const getAbsences = createAction(
  '[Absences Component] Get Absences',
  props<{
    role: string,
    studentId?: any,
    parentId?: any,
    teacherId?: any
    schoolId?: any,
  }>()
);

export const getAbsencesSuccess = createAction(
  '[Absences Component] Get Absences Success',
  props<{
    absences: any
  }>()
);

export const createAbsence = createAction(
  '[Absences Component] Create Absence',
  props<{
    absence: any
  }>()
);

export const createAbsenceSuccess = createAction(
  '[Absences Component] Create Absence Success',
);

export const deleteAbsence = createAction(
  '[Absences Component] Delete Absence',
  props<{
    absenceId: any
  }>()
);

export const deleteAbsenceSuccess = createAction(
  '[Absences Component] Delete Absence Success',
);