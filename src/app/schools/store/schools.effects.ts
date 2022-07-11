import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { SchoolsService } from '../schools.service';
import * as SchoolsActions from './schools.actions';


@Injectable()
export class SchoolsEffects {
  constructor(
    private actions$: Actions,
    private schoolsService: SchoolsService
  ){}

  getAllSchools$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SchoolsActions.getAllSchools),
            switchMap(action => {
                return this.schoolsService.getAllSchools()
                    .pipe(
                        map(response => {
                            return SchoolsActions.getAllSchoolsSuccess(
                                {
                                  schools: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createSchool$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SchoolsActions.createSchool),
            switchMap(action => {
                return this.schoolsService.createSchool(action.school)
                    .pipe(
                        map(response => {
                          return SchoolsActions.createSchoolSuccess();
                        })
                    )
            })
        )
    );

    // updateSchool$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(SchoolsActions.updateSchool),
    //         switchMap(action => {
    //             return this.schoolsService.updateSchool(action.school)
    //                 .pipe(
    //                     map(response => {
    //                         return SchoolsActions.updateSchoolSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );

    // deleteSchool$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(SchoolsActions.deleteSchool),
    //         switchMap(action => {
    //             return this.schoolsService.deleteSchool(action.schoolId)
    //                 .pipe(
    //                     map(response => {
    //                         return SchoolsActions.deleteSchoolSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );
}
