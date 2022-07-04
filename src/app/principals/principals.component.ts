import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, FilterService, SortService } from '@syncfusion/ej2-angular-grids';
import { Observable, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { AppService } from '../app.service';
import { MessageType } from '../models/message-type.enum';
import { principals } from './store/principals.selectors';
import { User } from '../shared/models/user.interface';
import { user } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-principals',
  templateUrl: './principals.component.html',
  styleUrls: ['./principals.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class PrincipalsComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly principals$: Observable<any> = this.store.pipe(select(principals), takeUntil(this.destroyed$));
  public principals: any;

  readonly user$: Observable<User> = this.store.pipe(select(user), takeUntil(this.destroyed$));
  private user: User;

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

    this.principals$.pipe(takeUntil(this.destroyed$)).subscribe(principals => {
      if (principals) {
        this.principals = JSON.parse(JSON.stringify(principals));
      }
    });

    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Principals Component] Create Principal Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new principal!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(getAllPrincipals());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Principals Component] Update Principal Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated principal!", MessageType.Success);
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Principals Component] Delete Principal Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted principal!", MessageType.Success);
    }));

    this.store.dispatch(appLoading({ loading: true }));
    // this.store.dispatch(getAllPrincipals());
  }

  public ngOnInit(): void {
    if (this.user.role == "ADMIN") {
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
      // this.store.dispatch(updatePrincipal({ principal: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let principalUsername = args.data[0].username;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(deletePrincipal({ principalUsername: principalUsername }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(createPrincipal({ principal: data }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
