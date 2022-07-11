import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class TeachersService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllTeachers() {
    return this.http.get<any>(
      apiUrls.teachersUrl
    )
  }

  createTeacher(teacher: any) {
    return this.http.post<any>(
      apiUrls.teachersUrl,
      {
        "email": teacher.email,
        "fullName": teacher.fullName,
        "password": teacher.password,
        "username": teacher.username,
        "role": "USER"
      }
    )
  }

  updateTeacher(id: number, teacher: any) {
    // return this.http.patch<any>(
    //   apiUrls.teachersUrl + '/${id}',
    //   {
    //     "firstName": teacher.firstName,
    //     "lastName": teacher.lastName,
    //     "username": teacher.username,
    //     "school": teacher.school,
    //     // "role": "USER"
    //   }
    // )
  }

  deleteTeacher(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    // return this.http.delete<any>(
    //   apiUrls.teachersUrl + '/${id}',

    //   // apiUrls.teachersUrl + '/' + id,

    //   // apiUrls.teachersUrl,
    //   // options
    // )
  }
}
