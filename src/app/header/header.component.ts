import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import { BaseComponent } from '../shared/base.component';
import { first, takeUntil } from 'rxjs/operators';
import { AppState } from '../models/app-state.interface';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import * as HeaderSelectors from '../header/store/header.selectors';
import * as HeaderActions from '../header/store/header.actions';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { user } from '../auth/store/auth.selectors';
import { User } from '../shared/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
  @Output() logoClicked = new EventEmitter<boolean>();
  
  readonly sidenavOpened$: Observable<boolean> = this.store.pipe(select(HeaderSelectors.sidenavOpened), takeUntil(this.destroyed$));
  readonly user$: Observable<User> = this.store.pipe(select(user), takeUntil(this.destroyed$));
  
  public user: User;
  
  public isMobile: boolean = false;

  constructor(
    private store: Store<AppState>,
    private observer: BreakpointObserver,
    private router: Router,
  ) {
    super();

    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
      if (res.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  public redirectToHome() {
    if (this.router.url == "/home") {
      window.location.reload();
    } else {
      this.logoClicked.emit(true);
    }
  }

  public onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  private openSidenav() {
    this.store.dispatch(HeaderActions.showSidenav());
  }

  private closeSidenav() {
    this.store.dispatch(HeaderActions.hideSidenav());
  }

  public toggleSidenav() {
    this.sidenavOpened$.pipe(first()).subscribe(open => {
      if (open) {
        return this.closeSidenav();
      }
      
      this.openSidenav();
    });
  }
}
