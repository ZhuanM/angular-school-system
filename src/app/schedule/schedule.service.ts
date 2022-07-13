import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class ScheduleService {
  constructor(
    private http: HttpClient,
  ) {}

  getSchedule(role: string, classId: any) {
    if (role == "DIRECTOR" || role == "ADMIN") {
      return this.http.get<any>(
        apiUrls.getAllSchedulesUrl
      )
    } else if (role == "STUDENT") {
      return this.http.get<any>(
        apiUrls.getScheduleByClassIdUrl + '/' + classId
      )
    }
  }

  createSchedule(schedule: any) {
    return this.http.post<any>(
      apiUrls.createScheduleByClassIdUrl,
      {
        "timestamp": schedule.email,
        "weekDay": schedule.fullName,
        "classTeacherId": schedule.password,
      }
    )
  }

  deleteSchedule(id: number) {
    return this.http.delete<any>(
      apiUrls.deleteScheduleByClassIdUrl + '/' + id,
    )
  }
}
