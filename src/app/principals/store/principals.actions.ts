import { createAction, props } from '@ngrx/store';

export const getPrincipals = createAction(
  '[Principals Component] Get Principals',
);

export const getPrincipalsSuccess = createAction(
  '[Principals Component] Get Principals Success',
  props<{
    principals: any
  }>()
);

export const updatePrincipal = createAction(
  '[Principals Component] Update Principal',
  props<{
    principal: any
  }>()
);

export const updatePrincipalSuccess = createAction(
  '[Principals Component] Update Principal Success',
);

export const deletePrincipal = createAction(
  '[Principals Component] Delete Principal',
  props<{
    principalId: any
  }>()
);

export const deletePrincipalSuccess = createAction(
  '[Principals Component] Delete Principal Success',
);