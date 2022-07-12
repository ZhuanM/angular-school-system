import { createAction, props } from '@ngrx/store';

export const getAllUsers = createAction(
  '[Users Component] Get All Users'
);

export const getAllUsersSuccess = createAction(
  '[Users Component] Get All Users Success',
  props<{
    users: any
  }>()
);

export const updateUser = createAction(
  '[Users Component] Update User',
  props<{
    user: any
  }>()
);

export const updateUserSuccess = createAction(
  '[Users Component] Update User Success',
);

export const deleteUser = createAction(
  '[Users Component] Delete User',
  props<{
    userId: any
  }>()
);

export const deleteUserSuccess = createAction(
  '[Users Component] Delete User Success',
);