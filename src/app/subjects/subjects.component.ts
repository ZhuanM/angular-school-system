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
import { subjects } from './store/subjects.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class SubjectsComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly subjects$: Observable<any> = this.store.pipe(select(subjects), takeUntil(this.destroyed$));
  public subjects: any;

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

    this.subjects$.pipe(takeUntil(this.destroyed$)).subscribe(subjects => {
      if (subjects) {
        this.subjects = subjects;
      }
    });

    // this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      // if (user) {
        this.role = sessionStorage.getItem('role');
      // }
    // });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Subjects Component] Create Subjects Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new subject!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(getAllSubjects());
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Subjects Component] Update Subjects Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated subject!", MessageType.Success);
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Subjects Component] Delete Subjects Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted subject!", MessageType.Success);
    }));

    this.store.dispatch(appLoading({ loading: true }));
    // this.store.dispatch(getAllSubjects());
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
      // this.store.dispatch(updateSubject({ subject: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let subjectId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(deleteSubject({ subjectId: subjectId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(createSubject({ subject: data }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
