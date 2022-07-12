import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class StudentsService {
  constructor(
    private http: HttpClient,
  ) {}

  getStudents(role: string, teacherId?: any, schoolId?: any) {
    if (role == "TEACHER") {
      return this.http.get<any>(
        apiUrls.getTeacherStudentsUrl + '/' + teacherId + '/students' 
      )
    } else if (role == "DIRECTOR") {
      return this.http.get<any>(
        apiUrls.getPrincipalStudentsUrl + '/' + schoolId
      )
    } else if (role == "ADMIN") {
      return this.http.get<any>(
        apiUrls.getAllStudents
      )
    }
  }
  
  updateStudent(student: any) {
    return this.http.patch<any>(
      apiUrls.studentsUrl + '/' + student.id,
      {
        "firstName": student.firstName,
        "lastName": student.lastName,
        "schoolClass": student.schoolClass
      }
    )
  }

  deleteStudent(id: number) {
    return this.http.delete<any>(
      apiUrls.studentsUrl + '/' + id,
    )
  }
}
