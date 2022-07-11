import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class GradesService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllGrades() {
    return this.http.get<any>(
      apiUrls.gradesUrl
    )
  }

  createGrade(grade: any) {
    return this.http.post<any>(
      apiUrls.gradesUrl,
      {
        "email": grade.email,
        "fullName": grade.fullName,
        "password": grade.password,
        "username": grade.username,
        "role": "USER"
      }
    )
  }

  updateGrade(id: number, grade: any) {
    // return this.http.patch<any>(
    //   apiUrls.gradesUrl + '/${id}',
    //   {
    //     "firstName": grade.firstName,
    //     "lastName": grade.lastName,
    //     "username": grade.username,
    //     "school": grade.school,
    //     // "role": "USER"
    //   }
    // )
  }

  deleteGrade(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    // return this.http.delete<any>(
    //   apiUrls.gradesUrl + '/${id}',

    //   // apiUrls.gradesUrl + '/' + id,

    //   // apiUrls.gradesUrl,
    //   // options
    // )
  }
}
