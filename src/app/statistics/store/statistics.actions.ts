import { createAction, props } from "@ngrx/store";

export const getStatistics = createAction(
    '[Statistics Component] Get Statistics',
    props<{
        schoolId: any
    }>()
);

export const getStatisticsSuccess = createAction(
    '[Statistics Component] Get Statistics Success',
    props<{
        averageGrade: any,
        totalStudents: any,
        totalTeachers: any
    }>()
);

export const getAllStatistics = createAction(
    '[Statistics Component] Get All Statistics'
);

export const getAllStatisticsSuccess = createAction(
    '[Statistics Component] Get All Statistics Success',
    props<{
        statistics: any,
    }>()
);
