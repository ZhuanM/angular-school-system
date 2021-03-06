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
import { schedule } from './store/schedule.selectors';
import { AppState } from '../shared/models/app-state.interface';
import { MessageType } from '../shared/models/message-type.enum';
import { deleteSchedule, getSchedule } from './store/schedule.actions';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class ScheduleComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly schedule$: Observable<any> = this.store.pipe(select(schedule), takeUntil(this.destroyed$));
  public schedule: any;

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

    this.schedule$.pipe(takeUntil(this.destroyed$)).subscribe(schedule => {
      if (schedule) {
        this.schedule = schedule;
      }
    });

    this.role = sessionStorage.getItem('role');

    this.getSchedule();

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Schedule Component] Create Schedule Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new schedule!", MessageType.Success);

      this.getSchedule();
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Schedule Component] Update Schedule Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated schedule!", MessageType.Success);

      this.getSchedule();
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Schedule Component] Delete Schedule Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted schedule!", MessageType.Success);

      this.getSchedule();
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
      let scheduleClassId = args.data[0].classId;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteSchedule({ scheduleClassId: scheduleClassId }));
    }
  }

  private getSchedule() {
    this.store.dispatch(appLoading({ loading: true }));
    if (this.role === "STUDENT") {
      const sclassId = sessionStorage.getItem('sclassId');
      this.store.dispatch(getSchedule({ role: this.role, classId: sclassId }));
    } else if (this.role === "DIRECTOR") {
      this.store.dispatch(getSchedule({ role: this.role }));
    } else if (this.role === "ADMIN") {
      this.store.dispatch(getSchedule({ role: this.role }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
