import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class AssignClassService {
  constructor(
    private http: HttpClient,
  ) {}

  createClass(classId: any, subjectId: any, teacherId: any) {
    return this.http.post<any>(
      apiUrls.createClassTeachersUrl,
      {
        "classId": classId,
        "subjectId": subjectId,
        "teacherId": teacherId
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
