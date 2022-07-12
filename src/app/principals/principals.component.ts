import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { EditService, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';
import { principals } from './store/principals.selectors';
import { deletePrincipal, getPrincipals, updatePrincipal } from './store/principals.actions';

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

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public firstNameRules: Object;
  public lastNameRules: Object;
  public schoolNameRules: Object;
  public schoolIdRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.principals$.pipe(takeUntil(this.destroyed$)).subscribe(principals => {
      if (principals) {
        this.principals = principals;
      }
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getPrincipals());

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Principals Component] Update Principal Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated principal!", MessageType.Success);
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getPrincipals());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Principals Component] Delete Principal Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted principal!", MessageType.Success);
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getPrincipals());
    }));
  }

  public ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { number: true };
    this.schoolIdRules = { required: true };
    this.schoolNameRules = {  };
    this.firstNameRules = { required: true };
    this.lastNameRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updatePrincipal({ principal: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let principalId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deletePrincipal({ principalId: principalId }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
