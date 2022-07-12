import { createAction, props } from "@ngrx/store";

export const getSchool = createAction(
    '[School Component] Get School',
    props<{
        id: any
    }>()
);

export const getSchoolSuccess = createAction(
    '[School Component] Get School Success',
    props<{
        name: string,
        schoolAddress: string
    }>()
);
