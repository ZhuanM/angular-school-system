import { createAction, props } from '@ngrx/store';

export const getAllAbsences = createAction(
  '[Absences Component] Get All Absences'
);

export const getAllAbsencesSuccess = createAction(
  '[Absences Component] Get All Absences Success',
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

export const updateAbsence = createAction(
  '[Absences Component] Update Absence',
  props<{
    absence: any
  }>()
);

export const updateAbsenceSuccess = createAction(
  '[Absences Component] Update Absence Success',
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