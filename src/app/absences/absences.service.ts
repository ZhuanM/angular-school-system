import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class AbsencesService {
  constructor(
    private http: HttpClient,
  ) {}

  getAbsences(role: string, studentId?: any, parentId?: any, teacherId?: any, schoolId?: any) {
    if (role === "STUDENT") {
      return this.http.get<any>(
        apiUrls.getStudentAbsencesUrl + '/' + studentId
      )
    } else if (role === "PARENT") {
      return this.http.get<any>(
        apiUrls.getParentAbsencesUrl + '/' + parentId
      )
    } else if (role === "TEACHER") {
      return this.http.get<any>(
        apiUrls.getTeacherAbsencesUrl + '/' + teacherId
      )
    } else if (role === "DIRECTOR") {
      return this.http.get<any>(
        apiUrls.getPrincipalAbsencesUrl + '/' + schoolId
      )
    } else if (role === "ADMIN") {
      return this.http.get<any>(
        apiUrls.getAllAbsencesUrl
      )
    }
  }

  createAbsence(absence: any) {
    return this.http.post<any>(
      apiUrls.absencesUrl,
      {
        "studentId": absence.studentId,
        "teacherId": absence.teacherId,
        "subject": absence.subject,
      }
    )
  }

  deleteAbsence(id: number) {
    return this.http.delete<any>(
      apiUrls.absencesUrl + '/' + id,
    )
  }
}
