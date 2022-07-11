import { createAction, props } from '@ngrx/store';

export const getAllSchools = createAction(
  '[Schools Component] Get All Schools'
);

export const getAllSchoolsSuccess = createAction(
  '[Schools Component] Get All Schools Success',
  props<{
    schools: any
  }>()
);

export const createSchool = createAction(
  '[Schools Component] Create School',
  props<{
    school: any
  }>()
);

export const createSchoolSuccess = createAction(
  '[Schools Component] Create School Success',
);

export const updateSchool = createAction(
  '[Schools Component] Update School',
  props<{
    school: any
  }>()
);

export const updateSchoolSuccess = createAction(
  '[Schools Component] Update School Success',
);

export const deleteSchool = createAction(
  '[Schools Component] Delete School',
  props<{
    schoolId: any
  }>()
);

export const deleteSchoolSuccess = createAction(
  '[Schools Component] Delete School Success',
);