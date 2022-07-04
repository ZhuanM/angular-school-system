import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { PrincipalsService } from '../principals.service';
import * as PrincipalsActions from './principals.actions';


@Injectable()
export class PrincipalsEffects {
    constructor(
        private actions$: Actions,
        private principalsService: PrincipalsService,
    ) { }

    getAllPrincipals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PrincipalsActions.getAllPrincipals),
            switchMap(action => {
                return this.principalsService.getAllPrincipals()
                    .pipe(
                        map(response => {
                            return PrincipalsActions.getAllPrincipalsSuccess(
                                {
                                    principals: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createPrincipal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PrincipalsActions.createPrincipal),
            switchMap(action => {
                return this.principalsService.createPrincipal(action.principal)
                    .pipe(
                        map(response => {
                            return PrincipalsActions.createPrincipalSuccess();
                        })
                    )
            })
        )
    );

    // updatePrincipal$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(PrincipalsActions.updatePrincipal),
    //         switchMap(action => {
    //             return this.principalsService.updatePrincipal(action.principal)
    //                 .pipe(
    //                     map(response => {
    //                         return PrincipalsActions.updatePrincipalSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );

    // deletePrincipal$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(PrincipalsActions.deletePrincipal),
    //         switchMap(action => {
    //             return this.principalsService.deletePrincipal(action.principalUsername)
    //                 .pipe(
    //                     map(response => {
    //                         return PrincipalsActions.deletePrincipalSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );
}
