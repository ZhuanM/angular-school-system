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
import { parents } from './store/parents.selectors';
import { deleteParent, getParents, updateParent } from './store/parents.actions';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class ParentsComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly parents$: Observable<any> = this.store.pipe(select(parents), takeUntil(this.destroyed$));
  public parents: any;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public firstNameRules: Object;
  public lastNameRules: Object;
  public childrenIdsRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.parents$.pipe(takeUntil(this.destroyed$)).subscribe(parents => {
      if (parents) {
        this.parents = parents;
      }
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getParents());

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Parents Component] Update Parent Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated parent!", MessageType.Success);
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getParents());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Parents Component] Delete Parent Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted parent!", MessageType.Success);
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getParents());
    }));
  }

  public ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { number: true };
    this.firstNameRules = { required: true };
    this.lastNameRules = { required: true };
    this.childrenIdsRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updateParent({ parent: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let parentId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteParent({ parentId: parentId }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
