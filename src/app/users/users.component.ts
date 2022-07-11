import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { User } from '../shared/models/user.interface';
import { EditService, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { user } from '../auth/store/auth.selectors';
import { users } from './store/users.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class UsersComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly users$: Observable<any> = this.store.pipe(select(users), takeUntil(this.destroyed$));
  public users: any;

  readonly user$: Observable<User> = this.store.pipe(select(user), takeUntil(this.destroyed$));
  private role: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public usernameRules: Object;
  public emailRules: Object;
  public fullNameRules: Object;
  public passwordRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.users$.pipe(takeUntil(this.destroyed$)).subscribe(users => {
      if (users) {
        this.users = users;
      }
    });

    // this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      // if (user) {
        this.role = sessionStorage.getItem('role');
      // }
    // });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Users Component] Create Users Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new user!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(getAllUsers());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Users Component] Update Users Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated user!", MessageType.Success);
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Users Component] Delete Users Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted user!", MessageType.Success);
    }));

    this.store.dispatch(appLoading({ loading: true }));
    // this.store.dispatch(getAllUsers());
  }

  public ngOnInit(): void {
    if (this.role == "ADMIN") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { required: true, number: true };
    this.usernameRules = { required: true };
    this.passwordRules = { required: true };
    this.emailRules = { required: true };
    this.fullNameRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(updateUser({ user: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let userId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(deleteUser({ userId: userId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(createUser({ user: data }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
