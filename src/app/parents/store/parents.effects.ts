import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { ParentsService } from '../parents.service';
import * as ParentsActions from './parents.actions';


@Injectable()
export class ParentsEffects {
    constructor(
        private actions$: Actions,
        private parentsService: ParentsService
    ) { }

    getParents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ParentsActions.getParents),
            switchMap(action => {
                return this.parentsService.getParents()
                    .pipe(
                        map(response => {
                            return ParentsActions.getParentsSuccess(
                                {
                                    parents: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    updateParent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ParentsActions.updateParent),
            switchMap(action => {
                return this.parentsService.updateParent(action.parent)
                    .pipe(
                        map(response => {
                            return ParentsActions.updateParentSuccess();
                        })
                    )
            })
        )
    );

    deleteParent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ParentsActions.deleteParent),
            switchMap(action => {
                return this.parentsService.deleteParent(action.parentId)
                    .pipe(
                        map(response => {
                            return ParentsActions.deleteParentSuccess();
                        })
                    )
            })
        )
    );
}
