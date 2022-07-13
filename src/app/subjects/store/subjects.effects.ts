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
    ) { }

    getAllSubjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectsActions.getSubjects),
            switchMap(action => {
                return this.subjectsService.getSubjects(action.role, action.teacherId)
                    .pipe(
                        map(response => {
                            return SubjectsActions.getSubjectsSuccess(
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

    deleteSubject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectsActions.deleteSubject),
            switchMap(action => {
                return this.subjectsService.deleteSubject(action.subjectId)
                    .pipe(
                        map(response => {
                            return SubjectsActions.deleteSubjectSuccess();
                        })
                    )
            })
        )
    );
}
