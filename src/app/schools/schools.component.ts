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
import { schools } from './store/schools.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';
import { createSchool, deleteSchool, getAllSchools, updateSchool } from './store/schools.actions';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class SchoolsComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly schools$: Observable<any> = this.store.pipe(select(schools), takeUntil(this.destroyed$));
  public schools: any;

  readonly user$: Observable<User> = this.store.pipe(select(user), takeUntil(this.destroyed$));
  private role: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public nameRules: Object;
  public addressRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.schools$.pipe(takeUntil(this.destroyed$)).subscribe(schools => {
      if (schools) {
        this.schools = schools;
      }
    });

    this.role = sessionStorage.getItem('role');

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getAllSchools());

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Schools Component] Create School Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new school!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getAllSchools());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Schools Component] Update School Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated school!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getAllSchools());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Schools Component] Delete School Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted school!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getAllSchools());
    }));
  }

  public ngOnInit(): void {
    if (this.role == "ADMIN") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { number: true };
    this.addressRules = { required: true };
    this.nameRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updateSchool({ school: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let schoolId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteSchool({ schoolId: schoolId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createSchool({ school: data }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
