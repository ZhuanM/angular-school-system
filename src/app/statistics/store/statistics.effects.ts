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
                return this.statisticsService.getStatistics()
                    .pipe(
                        map(response => {
                            return StatisticsActions.getStatisticsSuccess(
                                {
                                    statistics: response,
                                }
                            )
                        }),
                    );
            })
        )
    );
}
