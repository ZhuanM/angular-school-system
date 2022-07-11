import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { BaseComponent } from '../shared/base.component';
import { Observable, Subscription } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { User } from '../shared/models/user.interface';
import { EditService, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { grades } from './store/grades.selectors';
import { user } from '../auth/store/auth.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';

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

  readonly user$: Observable<User> = this.store.pipe(select(user), takeUntil(this.destroyed$));
  private role: string;

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

    this.grades$.pipe(takeUntil(this.destroyed$)).subscribe(grades => {
      if (grades) {
        this.grades = grades;
      }
    });

    // this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      // if (user) {
        this.role = sessionStorage.getItem('role');
      // }
    // });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Grades Component] Create Grades Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new grade!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(getAllGrades());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Grades Component] Update Grades Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated grade!", MessageType.Success);
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Grades Component] Delete Grades Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted grade!", MessageType.Success);
    }));

    this.store.dispatch(appLoading({ loading: true }));
    // this.store.dispatch(getAllGrades());
  }

  public ngOnInit(): void {
    if (this.role == "ADMIN") {
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
      // this.store.dispatch(updateGrade({ grade: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let gradeId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(deleteGrade({ gradeId: gradeId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(createGrade({ grade: data }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
