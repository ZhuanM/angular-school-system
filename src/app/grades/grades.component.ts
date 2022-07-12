import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { EditService, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { grades } from './store/grades.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';
import { createGrade, deleteGrade, getGrades, updateGrade } from './store/grades.actions';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class GradesComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly grades$: Observable<any> = this.store.pipe(select(grades), takeUntil(this.destroyed$));
  public grades: any;

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
  public gradeRules: Object;
  public dateRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.grades$.pipe(takeUntil(this.destroyed$)).subscribe(grades => {
      if (grades) {
        this.grades = grades;
      }
    });

    this.role = sessionStorage.getItem('role');

    this.getGrades();

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Grades Component] Create Grade Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new grade!", MessageType.Success);

      this.getGrades();
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Grades Component] Update Grade Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated grade!", MessageType.Success);
      this.getGrades();
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Grades Component] Delete Grade Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted grade!", MessageType.Success);
      this.getGrades();
    }));
  }

  public ngOnInit(): void {
    if (this.role == "ADMIN" || this.role == "TEACHER") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { number: true };
    this.teacherRules = {  };
    this.gradeRules = { required: true, min: 2, max: 6 };
    this.studentRules = {  };
    this.teacherIdRules = { required: true };
    this.studentIdRules = { required: true };
    this.subjectRules = { required: true };
    this.dateRules = {  };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updateGrade({ grade: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let gradeId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteGrade({ gradeId: gradeId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createGrade({ grade: data }));
    }
  }

  private getGrades() {
    this.store.dispatch(appLoading({ loading: true }));
    if (this.role === "STUDENT") {
      const studentId = sessionStorage.getItem('id');
      this.store.dispatch(getGrades({ role: this.role, studentId: studentId }));
    } else if (this.role === "PARENT") {
      const parentId = sessionStorage.getItem('id');
      this.store.dispatch(getGrades({ role: this.role, parentId: parentId }));
    } else if (this.role === "TEACHER") {
      const teacherId = sessionStorage.getItem('id');
      this.store.dispatch(getGrades({ role: this.role, teacherId: teacherId }));
    } else if (this.role === "DIRECTOR") {
      const schoolId = sessionStorage.getItem('schoolId');
      this.store.dispatch(getGrades({ role: this.role, schoolId: schoolId }));
    } else if (this.role === "ADMIN") {
      this.store.dispatch(getGrades({ role: this.role }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
