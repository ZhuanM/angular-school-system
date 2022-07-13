import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { AssignScheduleService } from '../assign-schedule.service';
import * as AssignScheduleActions from './assign-schedule.actions';


@Injectable()
export class AssignScheduleEffects {
    constructor(
        private actions$: Actions,
        private assignScheduleService: AssignScheduleService,
    ) { }

    createSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AssignScheduleActions.createSchedule),
            switchMap(action => {
                return this.assignScheduleService.createSchedule(action.classTeacherId, action.weekDay, action.timestamp)
                    .pipe(
                        map(response => {
                            return AssignScheduleActions.createScheduleSuccess()
                        }),
                    );
            })
        )
    );

    getClassTeachers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AssignScheduleActions.getClassTeachers),
            switchMap(action => {
                return this.assignScheduleService.getClassTeachers(action.role, action.schoolId)
                    .pipe(
                        map(response => {
                            return AssignScheduleActions.getClassTeachersSuccess(
                                {
                                    classTeachers: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    getAllSchools$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AssignScheduleActions.getAllSchools),
            switchMap(action => {
                return this.assignScheduleService.getAllSchools()
                    .pipe(
                        map(response => {
                            return AssignScheduleActions.getAllSchoolsSuccess(
                                {
                                  schools: response,
                                }
                            )
                        }),
                    );
            })
        )
    );
}
