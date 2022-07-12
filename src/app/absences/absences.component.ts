import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { EditService, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { absences } from './store/absences.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';
import { createAbsence, deleteAbsence, getAbsences } from './store/absences.actions';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class AbsencesComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly absences$: Observable<any> = this.store.pipe(select(absences), takeUntil(this.destroyed$));
  public absences: any;

  private role: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public teacherRules: Object;
  public studentRules: Object;
  public teacherIdRules: Object;
  public studentIdRules: Object;
  public subjectRules: Object;
  public dateRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.absences$.pipe(takeUntil(this.destroyed$)).subscribe(absences => {
      if (absences) {
        this.absences = absences;
      }
    });

    this.role = sessionStorage.getItem('role');

    this.getAbsences();

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Absences Component] Create Absence Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new absence!", MessageType.Success);

      this.getAbsences();
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Absences Component] Delete Absence Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted absence!", MessageType.Success);
      this.getAbsences();
    }));
  }

  public ngOnInit(): void {
    if (this.role == "ADMIN" || this.role == "TEACHER") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Add', 'Delete', 'Cancel'];
    this.idRules = { number: true };
    this.teacherRules = {  };
    this.studentRules = {  };
    this.teacherIdRules = { required: true };
    this.studentIdRules = { required: true };
    this.subjectRules = { required: true };
    this.dateRules = {  };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.requestType == "delete") {
      // DELETE
      let absenceId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteAbsence({ absenceId: absenceId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createAbsence({ absence: data }));
    }
  }

  private getAbsences() {
    this.store.dispatch(appLoading({ loading: true }));
    if (this.role === "STUDENT") {
      const studentId = sessionStorage.getItem('id');
      this.store.dispatch(getAbsences({ role: this.role, studentId: studentId }));
    } else if (this.role === "PARENT") {
      const parentId = sessionStorage.getItem('id');
      this.store.dispatch(getAbsences({ role: this.role, parentId: parentId }));
    } else if (this.role === "TEACHER") {
      const teacherId = sessionStorage.getItem('id');
      this.store.dispatch(getAbsences({ role: this.role, teacherId: teacherId }));
    } else if (this.role === "DIRECTOR") {
      const schoolId = sessionStorage.getItem('schoolId');
      this.store.dispatch(getAbsences({ role: this.role, schoolId: schoolId }));
    } else if (this.role === "ADMIN") {
      this.store.dispatch(getAbsences({ role: this.role }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
