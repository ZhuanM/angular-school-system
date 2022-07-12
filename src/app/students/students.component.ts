import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { EditService, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { students } from './store/students.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { deleteStudent, getStudents, updateStudent } from './store/students.actions';
import { MessageType } from '../shared/models/message-type.enum';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class StudentsComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly students$: Observable<any> = this.store.pipe(select(students), takeUntil(this.destroyed$));
  public students: any;

  private role: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public firstNameRules: Object;
  public lastNameRules: Object;
  public schoolNameRules: Object;
  public schoolClassRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.students$.pipe(takeUntil(this.destroyed$)).subscribe(students => {
      if (students) {
        this.students = students;
      }
    });

    this.role = sessionStorage.getItem('role');

    this.getStudents();

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Students Component] Update Student Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated student!", MessageType.Success);
      this.getStudents();
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Students Component] Delete Student Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted student!", MessageType.Success);
      this.getStudents();
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
    this.firstNameRules = { required: true };
    this.lastNameRules = { required: true };
    this.schoolNameRules = {  };
    this.schoolClassRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updateStudent({ student: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let studentId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteStudent({ studentId: studentId }));
    }
  }

  private getStudents() {
    this.store.dispatch(appLoading({ loading: true }));
    if (this.role === "TEACHER") {
      const teacherId = sessionStorage.getItem('id');
      this.store.dispatch(getStudents({ role: this.role, teacherId: teacherId }));
    } else if (this.role === "DIRECTOR") {
      const schoolId = sessionStorage.getItem('schoolId');
      this.store.dispatch(getStudents({ role: this.role, schoolId: schoolId }));
    } else if (this.role === "ADMIN") {
      this.store.dispatch(getStudents({ role: this.role }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
