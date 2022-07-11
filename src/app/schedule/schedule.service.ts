import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class ScheduleService {
  constructor(
    private http: HttpClient,
  ) {}

  getSchedule() {
    return this.http.get<any>(
      apiUrls.scheduleUrl
    )
  }

  createSchedule(schedule: any) {
    return this.http.post<any>(
      apiUrls.scheduleUrl,
      {
        "email": schedule.email,
        "fullName": schedule.fullName,
        "password": schedule.password,
        "username": schedule.username,
        "role": "USER"
      }
    )
  }

  deleteSchedule(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    // return this.http.delete<any>(
    //   apiUrls.scheduleUrl + '/${id}',

    //   // apiUrls.scheduleUrl + '/' + id,

    //   // apiUrls.scheduleUrl,
    //   // options
    // )
  }
}
