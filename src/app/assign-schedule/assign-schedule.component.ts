import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import { createSchedule, getAllSchools, getClassTeachers } from './store/assign-schedule.actions';
import { classTeachers, schools } from './store/assign-schedule.selectors';

@Component({
  selector: 'app-assign-schedule',
  templateUrl: './assign-schedule.component.html',
  styleUrls: ['./assign-schedule.component.scss']
})
export class AssignScheduleComponent extends BaseComponent {
  readonly schools$: Observable<string> = this.store.pipe(select(schools), takeUntil(this.destroyed$));
  public schools: string;

  readonly classTeachers$: Observable<string> = this.store.pipe(select(classTeachers), takeUntil(this.destroyed$));
  public classTeachers: string;

  public weekdays: Array<string> = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY' ];

  public role: any;

  public schoolId: any;

  public assignScheduleForm = new FormGroup({
    school: new FormControl(''),
    classTeacher: new FormControl('', [Validators.required]),
    weekDay: new FormControl('', [Validators.required]),
    timestamp: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<AppState>) { 
    super();

    this.role = sessionStorage.getItem('role');

    if (this.role == "ADMIN") {
      this.assignScheduleForm.get('school').setValidators(Validators.required);

      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getAllSchools());

      this.schools$.pipe(takeUntil(this.destroyed$)).subscribe(schools => {
        if (schools) {
          this.schools = schools;
        }
      });
    } else if (this.role == "DIRECTOR") {
      this.schoolId = sessionStorage.getItem('schoolId');
      this.getClassTeachers();
    }

    this.classTeachers$.pipe(takeUntil(this.destroyed$)).subscribe(classTeachers => {
      if (classTeachers) {
        this.classTeachers = classTeachers;
      }
    });
  }

  private getClassTeachers() {
    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getClassTeachers({ role: this.role, schoolId: this.schoolId }));
  }

  public onSchoolChange(event: any) {
    this.getClassTeachers();
  }

  public onSubmit() {
    if (this.assignScheduleForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createSchedule(
        {
          classTeacherId: this.assignScheduleForm.get('classTeacher').value.id,
          weekDay: this.assignScheduleForm.get('weekDay').value,
          timestamp: this.assignScheduleForm.get('timestamp').value,
        }
      ));
    }
  }
}
