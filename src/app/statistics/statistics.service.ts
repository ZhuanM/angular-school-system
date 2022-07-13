import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class StatisticsService {
  constructor(
    private http: HttpClient,
  ) {}

  getStatistics(schoolId: any) {
    return this.http.get<any>(
      apiUrls.getSchoolStatisticsUrl + '/' + schoolId + '/statistics'
    )
  }

  getAllStatistics() {
    // TODO CHANGE WITH REAL URL WHEN DONE
    return this.http.get<any>(
      apiUrls.getSchoolStatisticsUrl
    )
  }
}
