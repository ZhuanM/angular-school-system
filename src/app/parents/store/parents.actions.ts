import { createAction, props } from '@ngrx/store';

export const getParents = createAction(
  '[Parents Component] Get Parents',
);

export const getParentsSuccess = createAction(
  '[Parents Component] Get Parents Success',
  props<{
    parents: any
  }>()
);

export const updateParent = createAction(
  '[Parents Component] Update Parent',
  props<{
    parent: any
  }>()
);

export const updateParentSuccess = createAction(
  '[Parents Component] Update Parent Success',
);

export const deleteParent = createAction(
  '[Parents Component] Delete Parent',
  props<{
    parentId: any
  }>()
);

export const deleteParentSuccess = createAction(
  '[Parents Component] Delete Parent Success',
);