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
            ofType(AbsencesActions.getAllAbsences),
            switchMap(action => {
                return this.absencesService.getAllAbsences()
                    .pipe(
                        map(response => {
                            return AbsencesActions.getAllAbsencesSuccess(
                                {
                                  absences: response,
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

    // updateAbsence$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AbsencesActions.updateAbsence),
    //         switchMap(action => {
    //             return this.absencesService.updateAbsence(action.absence)
    //                 .pipe(
    //                     map(response => {
    //                         return AbsencesActions.updateAbsenceSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );

    // deleteAbsence$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AbsencesActions.deleteAbsence),
    //         switchMap(action => {
    //             return this.absencesService.deleteAbsence(action.absenceId)
    //                 .pipe(
    //                     map(response => {
    //                         return AbsencesActions.deleteAbsenceSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );
}
