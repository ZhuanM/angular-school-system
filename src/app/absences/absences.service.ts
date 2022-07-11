import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class AbsencesService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllAbsences() {
    return this.http.get<any>(
      apiUrls.absencesUrl
    )
  }

  createAbsence(absence: any) {
    return this.http.post<any>(
      apiUrls.absencesUrl,
      {
        "email": absence.email,
        "fullName": absence.fullName,
        "password": absence.password,
        "username": absence.username,
        "role": "USER"
      }
    )
  }

  updateAbsence(id: number, absence: any) {
    // return this.http.patch<any>(
    //   apiUrls.absencesUrl + '/${id}',
    //   {
    //     "firstName": absence.firstName,
    //     "lastName": absence.lastName,
    //     "username": absence.username,
    //     "school": absence.school,
    //     // "role": "USER"
    //   }
    // )
  }

  deleteAbsence(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    // return this.http.delete<any>(
    //   apiUrls.absencesUrl + '/${id}',

    //   // apiUrls.absencesUrl + '/' + id,

    //   // apiUrls.absencesUrl,
    //   // options
    // )
  }
}
