import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class ParentsService {
  constructor(
    private http: HttpClient,
  ) {}

  getParents() {
    return this.http.get<any>(
      apiUrls.parentsUrl
    )
  }

  updateParent(parent: any) {
    let childrenIdsArr = parent.childrenIds.split(',');

    return this.http.patch<any>(
      apiUrls.parentsUrl + '/' + parent.id,
      {
        "firstName": parent.firstName,
        "lastName": parent.lastName,
        "childrenIds": childrenIdsArr,
      }
    )
  }

  deleteParent(id: number) {
    return this.http.delete<any>(
      apiUrls.parentsUrl + '/' + id,
    )
  }
}
