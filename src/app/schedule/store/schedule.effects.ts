import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { ScheduleService } from '../schedule.service';
import * as ScheduleActions from './schedule.actions';


@Injectable()
export class ScheduleEffects {
  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService
  ){}

  getSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ScheduleActions.getSchedule),
            switchMap(action => {
                return this.scheduleService.getSchedule(action.role, action.classId)
                    .pipe(
                        map(response => {
                            return ScheduleActions.getScheduleSuccess(
                                {
                                  schedule: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ScheduleActions.createSchedule),
            switchMap(action => {
                return this.scheduleService.createSchedule(action.schedule)
                    .pipe(
                        map(response => {
                          return ScheduleActions.createScheduleSuccess();
                        })
                    )
            })
        )
    );

    deleteSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ScheduleActions.deleteSchedule),
            switchMap(action => {
                return this.scheduleService.deleteSchedule(action.scheduleClassId)
                    .pipe(
                        map(response => {
                            return ScheduleActions.deleteScheduleSuccess();
                        })
                    )
            })
        )
    );
}
