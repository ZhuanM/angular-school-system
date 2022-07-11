import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class StudentsService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllStudents() {
    return this.http.get<any>(
      apiUrls.studentsUrl
    )
  }

  createStudent(student: any) {
    return this.http.post<any>(
      apiUrls.studentsUrl,
      {
        "email": student.email,
        "fullName": student.fullName,
        "password": student.password,
        "username": student.username,
        "role": "USER"
      }
    )
  }

  updateStudent(id: number, student: any) {
    // return this.http.patch<any>(
    //   apiUrls.studentsUrl + '/${id}',
    //   {
    //     "firstName": student.firstName,
    //     "lastName": student.lastName,
    //     "username": student.username,
    //     "school": student.school,
    //     // "role": "USER"
    //   }
    // )
  }

  deleteStudent(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    // return this.http.delete<any>(
    //   apiUrls.studentsUrl + '/${id}',

    //   // apiUrls.studentsUrl + '/' + id,

    //   // apiUrls.studentsUrl,
    //   // options
    // )
  }
}
