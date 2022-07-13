import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { EditService, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { teachers } from './store/teachers.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { deleteTeacher, getTeachers, updateTeacher } from './store/teachers.actions';
import { MessageType } from '../shared/models/message-type.enum';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class TeachersComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly teachers$: Observable<any> = this.store.pipe(select(teachers), takeUntil(this.destroyed$));
  public teachers: any;

  private role: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public firstNameRules: Object;
  public lastNameRules: Object;
  public usernameRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.teachers$.pipe(takeUntil(this.destroyed$)).subscribe(teachers => {
      if (teachers) {
        this.teachers = teachers;
      }
    });

    this.role = sessionStorage.getItem('role');

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Teachers Component] Create Teacher Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new teacher!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getTeachers({ role: this.role, schoolId: schoolId }));
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Teachers Component] Update Teacher Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated teacher!", MessageType.Success);
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getTeachers({ role: this.role, schoolId: schoolId }));
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Teachers Component] Delete Teacher Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted teacher!", MessageType.Success);
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getTeachers({ role: this.role, schoolId: schoolId }));
    }));

    this.store.dispatch(appLoading({ loading: true }));
    const schoolId = sessionStorage.getItem('schoolId');
    this.store.dispatch(getTeachers({ role: this.role, schoolId: schoolId }));
  }

  public ngOnInit(): void {
    if (this.role == "ADMIN") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { required: true, number: true };
    this.usernameRules = { required: true };
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
      this.store.dispatch(updateTeacher({ teacher: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let teacherId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteTeacher({ teacherId: teacherId }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
