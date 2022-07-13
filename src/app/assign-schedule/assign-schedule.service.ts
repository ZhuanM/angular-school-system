import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class AssignScheduleService {
  constructor(
    private http: HttpClient,
  ) {}

  createSchedule(id: any, weekDay: any, timestamp: any) {
    return this.http.post<any>(
      apiUrls.createScheduleUrl,
      {
        "classTeacherId": id,
        "weekDay": weekDay,
        "timestamp": timestamp
      }
    )
  }

  getClassTeachers(role: string, schoolId: any) {
    if (role == "DIRECTOR") {
      return this.http.get<any>(
        apiUrls.getAllClassesTeachersUrl
      )
      // TODO CHANGE WHEN schoolId is implemented
      // return this.http.get<any>(
      //   apiUrls.getClassesTeachersBySchoolIdUrl + '/' + schoolId + '/all'
      // )
    } else if (role == "ADMIN") {
      return this.http.get<any>(
        apiUrls.getAllClassesTeachersUrl
      )
    }
  }

  getAllSchools() {
    return this.http.get<any>(
      apiUrls.getSchoolsUrl
    )
  }
}
