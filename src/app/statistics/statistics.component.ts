import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import { getStatistics } from './store/statistics.actions';
import { statistics } from './store/statistics.selectors';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends BaseComponent {
  readonly statistics$: Observable<any> = this.store.pipe(select(statistics), takeUntil(this.destroyed$));
  public statistics: any;
  
  constructor(private store: Store<AppState>) { 
    super();

    this.statistics$.pipe(takeUntil(this.destroyed$)).subscribe(statistics => {
      if (statistics) {
        this.statistics = statistics;
      }
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getStatistics());
  }
}
