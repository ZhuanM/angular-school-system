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
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';
import { deleteClass, getClasses } from './store/classes.actions';
import { classes } from './store/classes.selectors';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class ClassesComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly classes$: Observable<any> = this.store.pipe(select(classes), takeUntil(this.destroyed$));
  public classes: any;

  readonly user$: Observable<User> = this.store.pipe(select(user), takeUntil(this.destroyed$));
  private role: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.classes$.pipe(takeUntil(this.destroyed$)).subscribe(classes => {
      if (classes) {
        this.classes = classes;
      }
    });

    this.role = sessionStorage.getItem('role');

    this.getClasses();

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Classes Component] Delete Class Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted class!", MessageType.Success);

      this.getClasses();
    }));
  }

  public ngOnInit(): void {
    if (this.role == "ADMIN") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Delete', 'Cancel'];
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.requestType == "delete") {
      // DELETE
      let teacherClassId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteClass({ teacherClassId: teacherClassId }));
    }
  }

  private getClasses() {
    this.store.dispatch(appLoading({ loading: true }));
    if (this.role === "STUDENT") {
      const sclassId = sessionStorage.getItem('sclassId');
      this.store.dispatch(getClasses({ role: this.role, classId: sclassId }));
    } else if (this.role === "DIRECTOR") {
      this.store.dispatch(getClasses({ role: this.role }));
    } else if (this.role === "ADMIN") {
      this.store.dispatch(getClasses({ role: this.role }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
