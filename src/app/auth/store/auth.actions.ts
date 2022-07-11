import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.interface';

export const login = createAction(
  '[Auth Component] Login',
  props<{
    username: string,
    password: string
  }>()
);

export const register = createAction(
  '[Auth Component] Register',
  props<{
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    role: string,
    school: any,
    class: string,
    subject: string
  }>()
);

export const authSuccess = createAction(
  '[Auth Component] Auth Success',
  props<{
    accessToken: string,
    id: number
  }>()
);

export const authFail = createAction(
  '[Auth Component] Auth Fail',
  props<{
    errorMessage: string
  }>()
);

export const getUser = createAction(
  '[Auth Component] Get User',
  props<{
    id: number
  }>()
);

export const getUserSuccess = createAction(
  '[Auth Component] Get User Success',
  props<{
    user: User
  }>()
);

export const getSchools = createAction(
  '[Auth Component] Get Schools'
);

export const getSchoolsSuccess = createAction(
  '[Auth Component] Get Schools Success',
  props<{
    schools: Array<any>
  }>()
);

export const logout = createAction(
  '[Auth Component] Logout'
);

export const logoutSuccess = createAction(
  '[Auth Component] Logout Success'
);

export const resetErrorState = createAction(
  '[Auth Component] Reset Error State'
);
