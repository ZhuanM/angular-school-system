import { createAction, props } from "@ngrx/store";

export const getStatistics = createAction(
    '[Statistics Component] Get Statistics'
);

export const getStatisticsSuccess = createAction(
    '[Statistics Component] Get Statistics Success',
    props<{
        statistics: any
    }>()
);
