import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { subjects } from './store/subjects.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';
import { createSubject, deleteSubject, getSubjects } from './store/subjects.actions';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  providers: [ToolbarService, PageService, SortService, FilterService]
})
export class SubjectsComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly subjects$: Observable<any> = this.store.pipe(select(subjects), takeUntil(this.destroyed$));
  public subjects: any;

  private role: string;

  public data: Object[];
  public toolbar: string[];
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.subjects$.pipe(takeUntil(this.destroyed$)).subscribe(subjects => {
      if (subjects) {
        this.subjects = subjects;
      }
    });

    this.role = sessionStorage.getItem('role');

    this.getSubjects();

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Subjects Component] Create Subject Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new subject!", MessageType.Success);

      this.getSubjects();
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Subjects Component] Update Subject Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated subject!", MessageType.Success);
      
      this.getSubjects();
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Subjects Component] Delete Subject Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted subject!", MessageType.Success);
      
      this.getSubjects();
    }));
  }

  public ngOnInit(): void {
    this.toolbar = ['Add', 'Delete', 'Cancel'];
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.requestType == "delete") {
      // DELETE
      let subjectId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteSubject({ subjectId: subjectId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createSubject({ subject: data }));
    }
  }

  private getSubjects() {
    this.store.dispatch(appLoading({ loading: true }));
    if (this.role === "TEACHER") {
      const teacherId = sessionStorage.getItem('id');
      this.store.dispatch(getSubjects({ role: this.role, teacherId: teacherId }));
    } else if (this.role === "DIRECTOR") {
      // const schoolId = sessionStorage.getItem('schoolId');
      this.store.dispatch(getSubjects({ role: this.role }));
    } else if (this.role === "ADMIN") {
      this.store.dispatch(getSubjects({ role: this.role }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
