import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class SchoolsService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllSchools() {
    return this.http.get<any>(
      apiUrls.getSchoolsUrl
    )
  }

  createSchool(school: any) {
    return this.http.post<any>(
      apiUrls.schoolsUrl,
      {
        "email": school.email,
        "fullName": school.fullName,
        "password": school.password,
        "username": school.username,
        "role": "USER"
      }
    )
  }

  updateSchool(id: number, school: any) {
    // return this.http.patch<any>(
    //   apiUrls.schoolsUrl + '/${id}',
    //   {
    //     "firstName": school.firstName,
    //     "lastName": school.lastName,
    //     "username": school.username,
    //     "school": school.school,
    //     // "role": "USER"
    //   }
    // )
  }

  deleteSchool(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    // return this.http.delete<any>(
    //   apiUrls.schoolsUrl + '/${id}',

    //   // apiUrls.schoolsUrl + '/' + id,

    //   // apiUrls.schoolsUrl,
    //   // options
    // )
  }
}
