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
