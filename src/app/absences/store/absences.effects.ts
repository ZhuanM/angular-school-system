import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { AbsencesService } from '../absences.service';
import * as AbsencesActions from './absences.actions';


@Injectable()
export class AbsencesEffects {
  constructor(
    private actions$: Actions,
    private absencesService: AbsencesService
  ){}

  getAllAbsences$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AbsencesActions.getAbsences),
            switchMap(action => {
                return this.absencesService.getAbsences(action.role, action.studentId, action.parentId, action.teacherId, action.schoolId)
                    .pipe(
                        map(response => {
                            let absences = response;
                            absences = absences.map((absence) => ({
                              ...absence,
                              dateString: absence.date[2] + '/' + absence.date[1] + '/' + absence.date[0]
                            }));

                            return AbsencesActions.getAbsencesSuccess(
                                {
                                  absences: absences,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createAbsence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AbsencesActions.createAbsence),
            switchMap(action => {
                return this.absencesService.createAbsence(action.absence)
                    .pipe(
                        map(response => {
                          return AbsencesActions.createAbsenceSuccess();
                        })
                    )
            })
        )
    );

    deleteAbsence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AbsencesActions.deleteAbsence),
            switchMap(action => {
                return this.absencesService.deleteAbsence(action.absenceId)
                    .pipe(
                        map(response => {
                            return AbsencesActions.deleteAbsenceSuccess();
                        })
                    )
            })
        )
    );
}
