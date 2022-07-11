import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { SubjectsService } from '../subjects.service';
import * as SubjectsActions from './subjects.actions';


@Injectable()
export class SubjectsEffects {
  constructor(
    private actions$: Actions,
    private subjectsService: SubjectsService
  ){}

  getAllSubjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectsActions.getAllSubjects),
            switchMap(action => {
                return this.subjectsService.getAllSubjects()
                    .pipe(
                        map(response => {
                            return SubjectsActions.getAllSubjectsSuccess(
                                {
                                  subjects: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createSubject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectsActions.createSubject),
            switchMap(action => {
                return this.subjectsService.createSubject(action.subject)
                    .pipe(
                        map(response => {
                          return SubjectsActions.createSubjectSuccess();
                        })
                    )
            })
        )
    );

    // updateSubject$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(SubjectsActions.updateSubject),
    //         switchMap(action => {
    //             return this.subjectsService.updateSubject(action.subject)
    //                 .pipe(
    //                     map(response => {
    //                         return SubjectsActions.updateSubjectSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );

    // deleteSubject$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(SubjectsActions.deleteSubject),
    //         switchMap(action => {
    //             return this.subjectsService.deleteSubject(action.subjectId)
    //                 .pipe(
    //                     map(response => {
    //                         return SubjectsActions.deleteSubjectSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );
}
