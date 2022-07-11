import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { SchoolService } from '../school.service';
import * as SchoolActions from './school.actions';


@Injectable()
export class SchoolEffects {
    constructor(
        private actions$: Actions,
        private schoolService: SchoolService,
    ) { }

    getSchoolName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SchoolActions.getSchoolName),
            switchMap(action => {
                return this.schoolService.getSchool()
                    .pipe(
                        map(response => {
                            return SchoolActions.getSchoolNameSuccess(
                                {
                                    name: response.name,
                                }
                            )
                        }),
                    );
            })
        )
    );
}
