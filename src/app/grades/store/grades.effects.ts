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
            ofType(GradesActions.getGrades),
            switchMap(action => {
                return this.gradesService.getGrades(action.role, action.studentId, action.parentId, action.teacherId, action.schoolId)
                    .pipe(
                        map(response => {
                            let grades = response;
                            grades = grades.map((grade) => ({
                              ...grade,
                              dateString: grade.date[2] + '/' + grade.date[1] + '/' + grade.date[0]
                            }));

                            return GradesActions.getGradesSuccess(
                                {
                                  grades: grades,
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

    updateGrade$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GradesActions.updateGrade),
            switchMap(action => {
                return this.gradesService.updateGrade(action.grade)
                    .pipe(
                        map(response => {
                            return GradesActions.updateGradeSuccess();
                        })
                    )
            })
        )
    );

    deleteGrade$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GradesActions.deleteGrade),
            switchMap(action => {
                return this.gradesService.deleteGrade(action.gradeId)
                    .pipe(
                        map(response => {
                            return GradesActions.deleteGradeSuccess();
                        })
                    )
            })
        )
    );
}
