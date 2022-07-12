import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class TeachersService {
  constructor(
    private http: HttpClient,
  ) {}

  getTeachers(role: string, schoolId: any) {
    if (role == "DIRECTOR") {
      return this.http.get<any>(
        apiUrls.getPrincipalTeachersUrl + '/' + schoolId + '/teachers'
      )
    } else if (role == "ADMIN") {
      return this.http.get<any>(
        apiUrls.getAllTeachersUrl
      )
    }
  }

  updateTeacher(teacher: any) {
    return this.http.patch<any>(
      apiUrls.teachersUrl + '/' + teacher.id,
      {
        "firstName": teacher.firstName,
        "lastName": teacher.lastName,
        "username": teacher.username
      }
    )
  }

  deleteTeacher(id: number) {
    return this.http.delete<any>(
      apiUrls.teachersUrl + '/' + id,
    )
  }
}
