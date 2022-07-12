import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class GradesService {
  constructor(
    private http: HttpClient,
  ) {}

  getGrades(role: string, studentId?: any, parentId?: any, teacherId?: any, schoolId?: any) {
    if (role === "STUDENT") {
      return this.http.get<any>(
        apiUrls.getStudentGradesUrl + '/' + studentId
      )
    } else if (role === "PARENT") {
      return this.http.get<any>(
        apiUrls.getParentGradesUrl + '/' + parentId
      )
    } else if (role === "TEACHER") {
      return this.http.get<any>(
        apiUrls.getTeacherGradesUrl + '/' + teacherId
      )
    } else if (role === "DIRECTOR") {
      return this.http.get<any>(
        apiUrls.getPrincipalGradesUrl + '/' + schoolId
      )
    } else if (role === "ADMIN") {
      return this.http.get<any>(
        apiUrls.getAllGradesUrl
      )
    }
  }

  createGrade(grade: any) {
    return this.http.post<any>(
      apiUrls.gradesUrl,
      {
        "grade": grade.grade,
        "studentId": grade.studentId,
        "teacherId": grade.teacherId,
        "subject": grade.subject,
      }
    )
  }

  updateGrade(grade: any) {
    return this.http.patch<any>(
      apiUrls.gradesUrl + '/' + grade.id,
      {
        "grade": grade.grade
      }
    )
  }

  deleteGrade(id: number) {
    return this.http.delete<any>(
      apiUrls.gradesUrl + '/' + id,
    )
  }
}
