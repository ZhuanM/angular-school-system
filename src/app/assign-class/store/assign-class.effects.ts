import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { AssignClassService } from '../assign-class.service';
import * as AssignClassActions from './assign-class.actions';


@Injectable()
export class AssignClassEffects {
    constructor(
        private actions$: Actions,
        private assignClassService: AssignClassService,
    ) { }

    createClass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AssignClassActions.createClass),
            switchMap(action => {
                return this.assignClassService.createClass(action.classId, action.subjectId, action.teacherId)
                    .pipe(
                        map(response => {
                            return AssignClassActions.createClassSuccess()
                        }),
                    );
            })
        )
    );

    getClassTeachers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AssignClassActions.getClassTeachers),
            switchMap(action => {
                return this.assignClassService.getClassTeachers(action.role, action.schoolId)
                    .pipe(
                        map(response => {
                            return AssignClassActions.getClassTeachersSuccess(
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
            ofType(AssignClassActions.getAllSchools),
            switchMap(action => {
                return this.assignClassService.getAllSchools()
                    .pipe(
                        map(response => {
                            return AssignClassActions.getAllSchoolsSuccess(
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
