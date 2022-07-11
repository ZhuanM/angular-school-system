import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { GradesService } from '../grades.service';
import * as GradesActions from './grades.actions';


@Injectable()
export class GradesEffects {
  constructor(
    private actions$: Actions,
    private gradesService: GradesService
  ){}

  getAllGrades$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GradesActions.getAllGrades),
            switchMap(action => {
                return this.gradesService.getAllGrades()
                    .pipe(
                        map(response => {
                            return GradesActions.getAllGradesSuccess(
                                {
                                  grades: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createGrade$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GradesActions.createGrade),
            switchMap(action => {
                return this.gradesService.createGrade(action.grade)
                    .pipe(
                        map(response => {
                          return GradesActions.createGradeSuccess();
                        })
                    )
            })
        )
    );

    // updateGrade$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(GradesActions.updateGrade),
    //         switchMap(action => {
    //             return this.gradesService.updateGrade(action.grade)
    //                 .pipe(
    //                     map(response => {
    //                         return GradesActions.updateGradeSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );

    // deleteGrade$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(GradesActions.deleteGrade),
    //         switchMap(action => {
    //             return this.gradesService.deleteGrade(action.gradeId)
    //                 .pipe(
    //                     map(response => {
    //                         return GradesActions.deleteGradeSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );
}
