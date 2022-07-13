import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import { getStatistics } from './store/statistics.actions';
import { averageGrade, totalStudents, totalTeachers } from './store/statistics.selectors';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends BaseComponent {
  readonly averageGrade$: Observable<any> = this.store.pipe(select(averageGrade), takeUntil(this.destroyed$));
  readonly totalStudents$: Observable<any> = this.store.pipe(select(totalStudents), takeUntil(this.destroyed$));
  readonly totalTeachers$: Observable<any> = this.store.pipe(select(totalTeachers), takeUntil(this.destroyed$));
  public statistics: any;

  public role: string;

  public totalTeachers: any;
  public totalStudents: any;
  public averageGrade: any;
  
  constructor(private store: Store<AppState>) { 
    super();

    this.role = sessionStorage.getItem('role');

    this.averageGrade$.pipe(takeUntil(this.destroyed$)).subscribe(averageGrade => {
      if (averageGrade) {
        this.averageGrade = averageGrade;
      }
    });

    this.totalStudents$.pipe(takeUntil(this.destroyed$)).subscribe(totalStudents => {
      if (totalStudents) {
        this.totalStudents = totalStudents;
      }
    });

    this.totalTeachers$.pipe(takeUntil(this.destroyed$)).subscribe(totalTeachers => {
      if (totalTeachers) {
        this.totalTeachers = totalTeachers;
      }
    });

    const schoolId = sessionStorage.getItem('schoolId');
    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getStatistics({ schoolId: schoolId }));
  }
}
