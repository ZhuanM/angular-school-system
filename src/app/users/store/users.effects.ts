import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { UsersService } from '../users.service';
import * as UsersActions from './users.actions';


@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ){}

  getAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.getAllUsers),
            switchMap(action => {
                return this.usersService.getAllUsers()
                    .pipe(
                        map(response => {
                            return UsersActions.getAllUsersSuccess(
                                {
                                  users: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.createUser),
            switchMap(action => {
                return this.usersService.createUser(action.user)
                    .pipe(
                        map(response => {
                          return UsersActions.createUserSuccess();
                        })
                    )
            })
        )
    );

    // updateUser$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(UsersActions.updateUser),
    //         switchMap(action => {
    //             return this.usersService.updateUser(action.user)
    //                 .pipe(
    //                     map(response => {
    //                         return UsersActions.updateUserSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );

    // deleteUser$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(UsersActions.deleteUser),
    //         switchMap(action => {
    //             return this.usersService.deleteUser(action.userId)
    //                 .pipe(
    //                     map(response => {
    //                         return UsersActions.deleteUserSuccess();
    //                     })
    //                 )
    //         })
    //     )
    // );
}
