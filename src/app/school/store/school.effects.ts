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

    getSchool$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SchoolActions.getSchool),
            switchMap(action => {
                return this.schoolService.getSchool(action.id)
                    .pipe(
                        map(response => {
                            return SchoolActions.getSchoolSuccess(
                                {
                                    name: response.name,
                                    schoolAddress: response.address
                                }
                            )
                        }),
                    );
            })
        )
    );
}
