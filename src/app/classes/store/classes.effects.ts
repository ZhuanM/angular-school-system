import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { ClassesService } from '../classes.service';
import * as ClassesActions from './classes.actions';


@Injectable()
export class ClassesEffects {
  constructor(
    private actions$: Actions,
    private classesService: ClassesService
  ){}

  getClasses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassesActions.getClasses),
            switchMap(action => {
                return this.classesService.getClasses(action.role, action.classId)
                    .pipe(
                        map(response => {
                            return ClassesActions.getClassesSuccess(
                                {
                                  classes: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    deleteClass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClassesActions.deleteClass),
            switchMap(action => {
                return this.classesService.deleteClass(action.teacherClassId)
                    .pipe(
                        map(response => {
                            return ClassesActions.deleteClassSuccess();
                        })
                    )
            })
        )
    );
}
