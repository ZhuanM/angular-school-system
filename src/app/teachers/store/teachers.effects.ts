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
  ){}

  getAllTeachers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeachersActions.getAllTeachers),
            switchMap(action => {
                return this.teachersService.getAllTeachers()
                    .pipe(
                        map(response => {
                            return TeachersActions.getAllTeachersSuccess(
                                {
                                  teachers: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createTeacher$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeachersActions.createTeacher),
            switchMap(action => {
                return this.teachersService.createTeacher(action.teacher)
                    .pipe(
                        map(response => {
                          return TeachersActions.createTeacherSuccess();
                        })
                    )
            })
        )
    );

    // updateTeacher$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TeachersActions.updateTeacher),
    //         switchMap(action => {
    //             return this.teachersService.updateTeacher(action.teacher)
    //                 .pipe(
    //                     map(response => {
    //                         return TeachersActions.updateTeacherSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );

    // deleteTeacher$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TeachersActions.deleteTeacher),
    //         switchMap(action => {
    //             return this.teachersService.deleteTeacher(action.teacherId)
    //                 .pipe(
    //                     map(response => {
    //                         return TeachersActions.deleteTeacherSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );
}
