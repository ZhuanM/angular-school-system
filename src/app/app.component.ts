import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter, first, takeUntil } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { BaseComponent } from './shared/base.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as HeaderActions from './header/store/header.actions';
import * as HeaderSelectors from './header/store/header.selectors';
import { user } from './auth/store/auth.selectors';
import { User } from './shared/models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  private subscription = new Subscription();

  // SIDENAV
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  readonly sidenavOpened$: Observable<boolean> = this.store.pipe(select(HeaderSelectors.sidenavOpened), takeUntil(this.destroyed$));
  readonly user$: Observable<User> = this.store.pipe(select(user), takeUntil(this.destroyed$));

  public sideNavItems: Array<any>;

  // URLs
  private homeURL: boolean = false;
  private loginURL: boolean = false;
  private registerURL: boolean = false;
  private usersURL: boolean = false;
  private studentsURL: boolean = false;
  private gradesURL: boolean = false;
  private absencesURL: boolean = false;
  private statisticsURL: boolean = false;
  private schoolsURL: boolean = false;
  private schoolURL: boolean = false;
  private subjectsURL: boolean = false;
  private teachersURL: boolean = false;
  private scheduleURL: boolean = false;
  private parentsURL: boolean = false;
  private principalsURL: boolean = false;
  private assignScheduleURL: boolean = false;
  private classesURL: boolean = false;
  private assignClassURL: boolean = false;

  private role: string;
  private isAccountLocked: boolean;

  constructor(
    private observer: BreakpointObserver,
    private store: Store,
    private router: Router,
    private location: Location,
    private actionsSubject$: ActionsSubject,
  ) {
    super();

    this.updateSidenavItems();

    this.isAccountLocked = (sessionStorage.getItem('accountLocked') === 'true');
    
    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.role = sessionStorage.getItem('role');
      this.updateSidenavItems();
    });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Auth Component] Logout Success'))
    .subscribe(() => {
      this.role = sessionStorage.getItem('role');
      this.updateSidenavItems();
    }));
  }

  // THIS FUNCTION EXISTS BECAUSE this.location.path() doesn't return correct url when logging in and doesn't update accordingly the header and sidenav
  public toHome() {
    if (this.role == null) {
      this.homeURL = true;
      this.loginURL = false;
      this.registerURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "login",
          text: "Login",
          clicked: this.loginURL
        },
        {
          icon: "account_circle",
          text: "Register",
          clicked: this.registerURL
        },
      ];
    } else if (this.role == "STUDENT") {
      this.homeURL = true;
      this.gradesURL = false;
      this.absencesURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL,
          isAccountLocked: this.isAccountLocked
        }
      ];
    } else if (this.role == "PARENT") {
      this.homeURL = true;
      this.gradesURL = false;
      this.absencesURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL,
          isAccountLocked: this.isAccountLocked
        }
      ];
    } else if (this.role == "TEACHER") {
      this.homeURL = true;
      this.gradesURL = false;
      this.absencesURL = false;
      this.studentsURL = false;
      this.subjectsURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "group",
          text: "Students",
          clicked: this.studentsURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "square_foot",
          text: "Subjects",
          clicked: this.subjectsURL,
          isAccountLocked: this.isAccountLocked
        }
      ];
    }  else if (this.role == "DIRECTOR") {
      this.homeURL = true;
      this.gradesURL = false;
      this.absencesURL = false;
      this.studentsURL = false;
      this.teachersURL = false;
      this.subjectsURL = false;
      this.statisticsURL = false;
      this.schoolURL = false;
      this.scheduleURL = false;
      this.assignScheduleURL = false;
      this.classesURL = false;
      this.assignClassURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "group",
          text: "Students",
          clicked: this.studentsURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "school",
          text: "Teachers",
          clicked: this.teachersURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "square_foot",
          text: "Subjects",
          clicked: this.subjectsURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "monitoring",
          text: "Statistics",
          clicked: this.statisticsURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "location_city",
          text: "School",
          clicked: this.schoolURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "calendar_month",
          text: "Schedule",
          clicked: this.scheduleURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "calendar_month",
          text: "Assign Schedule",
          clicked: this.assignScheduleURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "school",
          text: "Classes",
          clicked: this.classesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "school",
          text: "Assign Class",
          clicked: this.assignClassURL,
          isAccountLocked: this.isAccountLocked
        }
      ];
    } else if (this.role == "ADMIN") {
      this.homeURL = true;
      this.gradesURL = false;
      this.absencesURL = false;
      this.usersURL = false;
      this.subjectsURL = false;
      this.statisticsURL = false;
      this.schoolsURL = false;
      this.scheduleURL = false;
      this.classesURL = false;
      this.assignClassURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL
        },
        {
          icon: "group",
          text: "Users",
          clicked: this.usersURL
        },
        {
          icon: "group",
          text: "Students",
          clicked: this.studentsURL
        },
        {
          icon: "group",
          text: "Parents",
          clicked: this.parentsURL
        },
        {
          icon: "group",
          text: "Teachers",
          clicked: this.teachersURL
        },
        {
          icon: "group",
          text: "Principals",
          clicked: this.principalsURL
        },
        {
          icon: "square_foot",
          text: "Subjects",
          clicked: this.subjectsURL
        },
        {
          icon: "monitoring",
          text: "Statistics",
          clicked: this.statisticsURL
        },
        {
          icon: "location_city",
          text: "Schools",
          clicked: this.schoolsURL
        },
        {
          icon: "calendar_month",
          text: "Schedule",
          clicked: this.scheduleURL
        },
        {
          icon: "calendar_month",
          text: "Assign Schedule",
          clicked: this.assignScheduleURL
        },
        {
          icon: "school",
          text: "Classes",
          clicked: this.classesURL
        },
        {
          icon: "school",
          text: "Assign Class",
          clicked: this.assignClassURL
        }
      ];
    }
  }

  public updateSidenavItems() {
    if (this.role == null) {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.loginURL = false;
        this.registerURL = false;
      } else if (this.location.path() == "/login") {
        this.loginURL = true;
        this.homeURL = false;
        this.registerURL = false;
      } else if (this.location.path() == "/register") {
        this.registerURL = true;
        this.homeURL = false;
        this.loginURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "login",
          text: "Login",
          clicked: this.loginURL
        },
        {
          icon: "account_circle",
          text: "Register",
          clicked: this.registerURL
        },
      ];
    } else if (this.role == "STUDENT") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.gradesURL = false;
        this.absencesURL = false;
        this.scheduleURL = false;
      } else if (this.location.path() == "/grades") {
        this.gradesURL = true;
        this.homeURL = false;
        this.absencesURL = false;
        this.scheduleURL = false;
      } else if (this.location.path() == "/absences") {
        this.absencesURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.scheduleURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL,
          isAccountLocked: this.isAccountLocked
        }
      ];
    } else if (this.role == "PARENT") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.gradesURL = false;
        this.absencesURL = false;
      } else if (this.location.path() == "/grades") {
        this.gradesURL = true;
        this.homeURL = false;
        this.absencesURL = false;
      } else if (this.location.path() == "/absences") {
        this.absencesURL = true;
        this.homeURL = false;
        this.gradesURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL,
          isAccountLocked: this.isAccountLocked
        }
      ];
    } else if (this.role == "TEACHER") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.subjectsURL = false;
      } else if (this.location.path() == "/grades") {
        this.gradesURL = true;
        this.homeURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.subjectsURL = false;
      } else if (this.location.path() == "/absences") {
        this.absencesURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.studentsURL = false;
        this.subjectsURL = false;
      } else if (this.location.path() == "/students") {
        this.studentsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
      } else if (this.location.path() == "/subjects") {
        this.subjectsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "group",
          text: "Students",
          clicked: this.studentsURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "square_foot",
          text: "Subjects",
          clicked: this.subjectsURL,
          isAccountLocked: this.isAccountLocked
        }
      ];
    } else if (this.role == "DIRECTOR") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.scheduleURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/grades") {
        this.gradesURL = true;
        this.homeURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.scheduleURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/absences") {
        this.absencesURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.scheduleURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/students") {
        this.studentsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.scheduleURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/teachers") {
        this.teachersURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.scheduleURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/subjects") {
        this.subjectsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.scheduleURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/statistics") {
        this.statisticsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.schoolURL = false;
        this.scheduleURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/school") {
        this.schoolURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/schedule") {
        this.scheduleURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/assign_schedule") {
        this.assignScheduleURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.classesURL = false;
        this.scheduleURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/classes") {
        this.classesURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.assignScheduleURL = false;
        this.scheduleURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/assign_class") {
        this.assignClassURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolURL = false;
        this.assignScheduleURL = false;
        this.scheduleURL = false;
        this.classesURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "group",
          text: "Students",
          clicked: this.studentsURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "school",
          text: "Teachers",
          clicked: this.teachersURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "square_foot",
          text: "Subjects",
          clicked: this.subjectsURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "monitoring",
          text: "Statistics",
          clicked: this.statisticsURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "location_city",
          text: "School",
          clicked: this.schoolURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "calendar_month",
          text: "Schedule",
          clicked: this.scheduleURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "calendar_month",
          text: "Assign Schedule",
          clicked: this.assignScheduleURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "school",
          text: "Classes",
          clicked: this.classesURL,
          isAccountLocked: this.isAccountLocked
        },
        {
          icon: "school",
          text: "Assign Class",
          clicked: this.assignClassURL,
          isAccountLocked: this.isAccountLocked
        }
      ];
    } else if (this.role == "ADMIN") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.gradesURL = false;
        this.absencesURL = false;
        this.usersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolsURL = false;
        this.scheduleURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/grades") {
        this.gradesURL = true;
        this.homeURL = false;
        this.absencesURL = false;
        this.usersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolsURL = false;
        this.scheduleURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/absences") {
        this.absencesURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolsURL = false;
        this.scheduleURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/users") {
        this.usersURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.schoolsURL = false;
        this.scheduleURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/subjects") {
        this.subjectsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.statisticsURL = false;
        this.schoolsURL = false;
        this.scheduleURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/statistics") {
        this.statisticsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.schoolsURL = false;
        this.scheduleURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/schools") {
        this.schoolsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/students") {
        this.studentsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.schoolsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/parents") {
        this.parentsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.schoolsURL = false;
        this.studentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/teachers") {
        this.teachersURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.schoolsURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/principals") {
        this.principalsURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.schoolsURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/schedule") {
        this.scheduleURL = true;
        this.principalsURL = false;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.schoolsURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/assign_schedule") {
        this.assignScheduleURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.schoolsURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.classesURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/classes") {
        this.classesURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.schoolsURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.assignClassURL = false;
      } else if (this.location.path() == "/assign_class") {
        this.assignClassURL = true;
        this.homeURL = false;
        this.gradesURL = false;
        this.usersURL = false;
        this.absencesURL = false;
        this.subjectsURL = false;
        this.statisticsURL = false;
        this.scheduleURL = false;
        this.schoolsURL = false;
        this.studentsURL = false;
        this.parentsURL = false;
        this.teachersURL = false;
        this.principalsURL = false;
        this.assignScheduleURL = false;
        this.classesURL = false;
      }
      
      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "grade",
          text: "Grades",
          clicked: this.gradesURL
        },
        {
          icon: "rule",
          text: "Absences",
          clicked: this.absencesURL
        },
        {
          icon: "group",
          text: "Users",
          clicked: this.usersURL
        },
        {
          icon: "group",
          text: "Students",
          clicked: this.studentsURL
        },
        {
          icon: "group",
          text: "Parents",
          clicked: this.parentsURL
        },
        {
          icon: "group",
          text: "Teachers",
          clicked: this.teachersURL
        },
        {
          icon: "group",
          text: "Principals",
          clicked: this.principalsURL
        },
        {
          icon: "square_foot",
          text: "Subjects",
          clicked: this.subjectsURL
        },
        {
          icon: "monitoring",
          text: "Statistics",
          clicked: this.statisticsURL
        },
        {
          icon: "location_city",
          text: "Schools",
          clicked: this.schoolsURL
        },
        {
          icon: "calendar_month",
          text: "Schedule",
          clicked: this.scheduleURL
        },
        {
          icon: "calendar_month",
          text: "Assign Schedule",
          clicked: this.assignScheduleURL
        },
        {
          icon: "school",
          text: "Classes",
          clicked: this.classesURL
        },
        {
          icon: "school",
          text: "Assign Class",
          clicked: this.assignClassURL
        }
      ];
    }
  }

  public itemClicked(index: number) {
    for (let item of this.sideNavItems) {
      if (item.clicked) {
        item.clicked = false
      }
    }

    this.sideNavItems[index].clicked = true;

    if (this.role == null) {
      switch (this.sideNavItems[index].text) {
        case "Home":
          if (this.location.path() == "/home") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['home']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Login":
          if (this.location.path() == "/login") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['login']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Register":
          if (this.location.path() == "/register") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['register']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    } else if (this.role == "STUDENT") {
      switch (this.sideNavItems[index].text) {
        case "Home":
          if (this.location.path() == "/home") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['home']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Grades":
          if (this.location.path() == "/grades") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['grades']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Absences":
          if (this.location.path() == "/absences") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['absences']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    } else if (this.role == "PARENT") {
      switch (this.sideNavItems[index].text) {
        case "Home":
          if (this.location.path() == "/home") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['home']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Grades":
          if (this.location.path() == "/grades") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['grades']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Absences":
          if (this.location.path() == "/absences") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['absences']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    } else if (this.role == "TEACHER") {
      switch (this.sideNavItems[index].text) {
        case "Home":
          if (this.location.path() == "/home") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['home']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Grades":
          if (this.location.path() == "/grades") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['grades']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Absences":
          if (this.location.path() == "/absences") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['absences']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Students":
          if (this.location.path() == "/students") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['students']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Subjects":
          if (this.location.path() == "/subjects") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['subjects']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    } else if (this.role == "DIRECTOR") {
      switch (this.sideNavItems[index].text) {
        case "Home":
          if (this.location.path() == "/home") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['home']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Grades":
          if (this.location.path() == "/grades") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['grades']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Absences":
          if (this.location.path() == "/absences") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['absences']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Students":
          if (this.location.path() == "/students") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['students']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Teachers":
          if (this.location.path() == "/teachers") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['teachers']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Subjects":
          if (this.location.path() == "/subjects") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['subjects']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Statistics":
          if (this.location.path() == "/statistics") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['statistics']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "School":
          if (this.location.path() == "/school") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['school']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Schedule":
          if (this.location.path() == "/schedule") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['schedule']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Assign Schedule":
          if (this.location.path() == "/assign_schedule") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['assign_schedule']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Classes":
          if (this.location.path() == "/classes") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['classes']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Assign Class":
          if (this.location.path() == "/assign_class") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['assign_class']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    } else if (this.role == "ADMIN") {
      switch (this.sideNavItems[index].text) {
        case "Home":
          if (this.location.path() == "/home") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['home']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Grades":
          if (this.location.path() == "/grades") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['grades']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Absences":
          if (this.location.path() == "/absences") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['absences']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Users":
          if (this.location.path() == "/users") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['users']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Subjects":
          if (this.location.path() == "/subjects") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['subjects']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Statistics":
          if (this.location.path() == "/statistics") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['statistics']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Schools":
          if (this.location.path() == "/schools") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['schools']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Schedule":
          if (this.location.path() == "/schedule") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['schedule']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Students":
          if (this.location.path() == "/students") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['students']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Parents":
          if (this.location.path() == "/parents") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['parents']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Teachers":
          if (this.location.path() == "/teachers") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['teachers']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Principals":
          if (this.location.path() == "/principals") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['principals']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Assign Schedule":
          if (this.location.path() == "/assign_schedule") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['assign_schedule']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Classes":
          if (this.location.path() == "/classes") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['classes']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Assign Class":
          if (this.location.path() == "/assign_class") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['assign_class']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    }
  }

  ngAfterViewInit() {
    this.sidenavObserve();
  }

  // SIDENAV FUNCTIONS
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

  private sidenavObserve() {
    this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
      if (this.sidenav) {
        // THE TIMEOUT FIXES "ExpressionChangedAfterItHasBeenCheckedError"
        setTimeout(() => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.closeSidenav();
          } else {
            this.sidenav.mode = 'side';
            this.openSidenav();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
