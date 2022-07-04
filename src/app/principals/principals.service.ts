import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';

@Injectable({ providedIn: 'root' })
export class PrincipalsService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllPrincipals() {
    return this.http.get<any>(
      apiUrls.principalsUrl
    )
  }

  createPrincipal(principal: any) {
    return this.http.post<any>(
      apiUrls.registerUrl,
      {
        "email": principal.email,
        "fullName": principal.fullName,
        "password": principal.password,
        "username": principal.username,
        "role": "USER"
      }
    )
  }

  updatePrincipal(id: number, principal: any) {
    return this.http.patch<any>(
      apiUrls.principalsUrl + '/${id}',
      {
        "firstName": principal.firstName,
        "lastName": principal.lastName,
        "username": principal.username,
        "school": principal.school,
        // "role": "USER"
      }
    )
  }

  deletePrincipal(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    return this.http.delete<any>(
      apiUrls.principalsUrl + '/${id}',

      // apiUrls.principalsUrl + '/' + id,

      // apiUrls.principalsUrl,
      // options
    )
  }
}
