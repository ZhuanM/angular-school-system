import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { PrincipalsService } from '../principals.service';
import * as PrincipalsActions from './principals.actions';


@Injectable()
export class PrincipalsEffects {
    constructor(
        private actions$: Actions,
        private principalsService: PrincipalsService
    ) { }

    getPrincipals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PrincipalsActions.getPrincipals),
            switchMap(action => {
                return this.principalsService.getPrincipals()
                    .pipe(
                        map(response => {
                            return PrincipalsActions.getPrincipalsSuccess(
                                {
                                    principals: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    updatePrincipal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PrincipalsActions.updatePrincipal),
            switchMap(action => {
                return this.principalsService.updatePrincipal(action.principal)
                    .pipe(
                        map(response => {
                            return PrincipalsActions.updatePrincipalSuccess();
                        })
                    )
            })
        )
    );

    deletePrincipal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PrincipalsActions.deletePrincipal),
            switchMap(action => {
                return this.principalsService.deletePrincipal(action.principalId)
                    .pipe(
                        map(response => {
                            return PrincipalsActions.deletePrincipalSuccess();
                        })
                    )
            })
        )
    );
}
