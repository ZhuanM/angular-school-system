import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './../auth.service';
import { AppService } from '../../app.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageType } from 'src/app/shared/models/message-type.enum';
import { Auth } from 'src/app/shared/models/auth.interface';


@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(action => {
      return this.authService.login(action.username, action.password)
        .pipe(
          tap(() => this.router.navigate(['/home'])),
          map(response => {
            this.setSessionStorageData(response);
            return AuthActions.authSuccess(
              {
                accessToken: response.jwtToken,
                id: response.userId
              }
            )
          }),
          catchError((errorRes: HttpErrorResponse) => {
            return of(AuthActions.authFail(
              { errorMessage: 'Invalid username and/or password' }
            ));
          })
        );
      })
    )
  );

  authSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.authSuccess),
    switchMap(action => {
      return this.authService.getUser(action.id)
        .pipe(
          map(response => {
            sessionStorage.setItem('role', response.role);
            sessionStorage.setItem('username', response.username);
            sessionStorage.setItem('id', response.id);
            sessionStorage.setItem('email', response.email);
            sessionStorage.setItem('accountLocked', response.accountLocked);
            sessionStorage.setItem('schoolId', response.schoolId);

            this.appService.openSnackBar("Successfully logged in!", MessageType.Success);

            return AuthActions.getUserSuccess(
              {
                user: response
              }
            )
          })
        );
      })
    )
  );

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logout),
      tap(() => this.router.navigate(['/home'])),
      map(() => {
        // TOKEN
        sessionStorage.removeItem('access_token');

        // USER
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('accountLocked');

        return AuthActions.logoutSuccess();
      }),
    )
  );

  authRegister$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.register),
    switchMap(action => {
      const username = action.username;
      const password = action.password;
      
      return this.authService.register(
        action.firstName,
        action.lastName,
        action.username,
        action.password,
        action.email,
        action.role,
        action.school,
        action.class,
        action.subject
        )
        .pipe(
          map(authData => {
            return AuthActions.login({username: username, password: password})
          }),
          catchError((errorRes: HttpErrorResponse) => {
            return of(AuthActions.authFail(
              { errorMessage: 'Invalid email and/or password' }
            ));
          })
        );
      })
    )
  );

  getSchools$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.getSchools),
    switchMap(action => {
      return this.authService.getSchools()
        .pipe(
          map(data => {
            return AuthActions.getSchoolsSuccess({schools: data})
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private appService: AppService,
    private router: Router
  ){}

  private setSessionStorageData(authData: Auth) {
    sessionStorage.setItem('access_token', authData.jwtToken);
  }
}
