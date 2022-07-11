import { createAction, props } from "@ngrx/store";

export const getSchoolName = createAction(
    '[School Component] Get School Name'
);

export const getSchoolNameSuccess = createAction(
    '[School Component] Get School Name Success',
    props<{
        name: string
    }>()
);
