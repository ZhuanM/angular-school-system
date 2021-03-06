import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { EditService, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { users } from './store/users.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';
import { deleteUser, getAllUsers, updateUser } from './store/users.actions';

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

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public usernameRules: Object;
  public emailRules: Object;
  public roleRules: Object;
  public accountLockedRules: Object;
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

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getAllUsers());

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Users Component] Update User Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated user!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getAllUsers());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Users Component] Delete User Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted user!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getAllUsers());
    }));
  }

  public ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };

    this.toolbar = ['Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { required: true, number: true };
    this.usernameRules = { required: true };
    this.emailRules = { required: true };
    this.roleRules = { required: true };
    this.accountLockedRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updateUser({ user: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let userId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteUser({ userId: userId }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
