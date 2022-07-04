import { createAction, props } from "@ngrx/store";

export const getAllPrincipals = createAction(
    '[Principals Component] Get All Principals'
);

export const getAllPrincipalsSuccess = createAction(
    '[Principals Component] Get All Principals Success',
    props<{
        principals: any
    }>()
);

export const createPrincipal = createAction(
    '[Principals Component] Create Principal',
    props<{
        principal: any
    }>()
);

export const createPrincipalSuccess = createAction(
    '[Principals Component] Create Principal Success',
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
        principalUsername: any
    }>()
);

export const deletePrincipalSuccess = createAction(
    '[Principals Component] Delete Principal Success',
);

