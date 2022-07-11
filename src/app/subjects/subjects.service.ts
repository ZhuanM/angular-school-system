import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class SubjectsService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllSubjects() {
    return this.http.get<any>(
      apiUrls.subjectsUrl
    )
  }

  createSubject(subject: any) {
    return this.http.post<any>(
      apiUrls.subjectsUrl,
      {
        "email": subject.email,
        "fullName": subject.fullName,
        "password": subject.password,
        "username": subject.username,
        "role": "USER"
      }
    )
  }

  updateSubject(id: number, subject: any) {
    // return this.http.patch<any>(
    //   apiUrls.subjectsUrl + '/${id}',
    //   {
    //     "firstName": subject.firstName,
    //     "lastName": subject.lastName,
    //     "username": subject.username,
    //     "school": subject.school,
    //     // "role": "USER"
    //   }
    // )
  }

  deleteSubject(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    // return this.http.delete<any>(
    //   apiUrls.subjectsUrl + '/${id}',

    //   // apiUrls.subjectsUrl + '/' + id,

    //   // apiUrls.subjectsUrl,
    //   // options
    // )
  }
}
