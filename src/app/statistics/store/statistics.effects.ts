import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { StatisticsService } from '../statistics.service';
import * as StatisticsActions from './statistics.actions';


@Injectable()
export class StatisticsEffects {
    constructor(
        private actions$: Actions,
        private statisticsService: StatisticsService,
    ) { }

    getStatistics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StatisticsActions.getStatistics),
            switchMap(action => {
                return this.statisticsService.getStatistics(action.schoolId)
                    .pipe(
                        map(response => {
                            return StatisticsActions.getStatisticsSuccess(
                                {
                                    averageGrade: response.averageGrade,
                                    totalStudents: response.totalStudents,
                                    totalTeachers: response.totalTeachers
                                }
                            )
                        }),
                    );
            })
        )
    );

    getAllStatistics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StatisticsActions.getAllStatistics),
            switchMap(action => {
                return this.statisticsService.getAllStatistics()
                    .pipe(
                        map(response => {
                            return StatisticsActions.getAllStatisticsSuccess(
                                {
                                    statistics: response
                                }
                            )
                        }),
                    );
            })
        )
    );
}
