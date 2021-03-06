import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { TeachersService } from '../teachers.service';
import * as TeachersActions from './teachers.actions';


@Injectable()
export class TeachersEffects {
    constructor(
        private actions$: Actions,
        private teachersService: TeachersService
    ) { }

    getTeachers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeachersActions.getTeachers),
            switchMap(action => {
                return this.teachersService.getTeachers(action.role, action.schoolId)
                    .pipe(
                        map(response => {
                            return TeachersActions.getTeachersSuccess(
                                {
                                    teachers: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    updateTeacher$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeachersActions.updateTeacher),
            switchMap(action => {
                return this.teachersService.updateTeacher(action.teacher)
                    .pipe(
                        map(response => {
                            return TeachersActions.updateTeacherSuccess();
                        })
                    )
            })
        )
    );

    deleteTeacher$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeachersActions.deleteTeacher),
            switchMap(action => {
                return this.teachersService.deleteTeacher(action.teacherId)
                    .pipe(
                        map(response => {
                            return TeachersActions.deleteTeacherSuccess();
                        })
                    )
            })
        )
    );
}
