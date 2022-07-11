import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import { getSchoolName } from './store/school.actions';
import { schoolName } from './store/school.selectors';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent extends BaseComponent {
  readonly schoolName$: Observable<string> = this.store.pipe(select(schoolName), takeUntil(this.destroyed$));
  public schoolName: string;
  
  constructor(private store: Store<AppState>) { 
    super();

    this.schoolName$.pipe(takeUntil(this.destroyed$)).subscribe(schoolName => {
      if (schoolName) {
        this.schoolName = schoolName;
      }
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getSchoolName());
  }
}
