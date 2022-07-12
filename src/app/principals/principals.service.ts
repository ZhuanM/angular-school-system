import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class PrincipalsService {
  constructor(
    private http: HttpClient,
  ) {}

  getPrincipals() {
    return this.http.get<any>(
      apiUrls.principalsUrl
    )
  }

  updatePrincipal(principal: any) {
    return this.http.patch<any>(
      apiUrls.principalsUrl + '/' + principal.id,
      {
        "firstName": principal.firstName,
        "lastName": principal.lastName,
      }
    )
  }

  deletePrincipal(id: number) {
    return this.http.delete<any>(
      apiUrls.principalsUrl + '/' + id,
    )
  }
}
