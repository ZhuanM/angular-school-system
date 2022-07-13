import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import { createClass, getAllSchools, getClassTeachers } from './store/assign-class.actions';
import { classTeachers, schools } from './store/assign-class.selectors';
// import { createSchedule, getAllSchools, getClassTeachers } from './store/assign-schedule.actions';
// import { classTeachers, schools } from './store/assign-schedule.selectors';

@Component({
  selector: 'app-assign-class',
  templateUrl: './assign-class.component.html',
  styleUrls: ['./assign-class.component.scss']
})
export class AssignClassComponent extends BaseComponent {
  readonly schools$: Observable<string> = this.store.pipe(select(schools), takeUntil(this.destroyed$));
  public schools: string;

  readonly classTeachers$: Observable<string> = this.store.pipe(select(classTeachers), takeUntil(this.destroyed$));
  public classTeachers: any;

  public classes: Array<string> = [];
  public subjects: Array<string> = [];
  public teachers: Array<string> = [];

  public role: any;

  public schoolId: any;

  public assignClassForm = new FormGroup({
    school: new FormControl(''),
    class: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    teacher: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<AppState>) { 
    super();

    this.role = sessionStorage.getItem('role');

    if (this.role == "ADMIN") {
      this.assignClassForm.get('school').setValidators(Validators.required);

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
    if (this.assignClassForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createClass(
        {
          classId: this.assignClassForm.get('class').value,
          subjectId: this.assignClassForm.get('subject').value,
          teacherId: this.assignClassForm.get('teacher').value,
        }
      ));
    }
  }
}
