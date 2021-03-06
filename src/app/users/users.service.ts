import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllUsers() {
    return this.http.get<any>(
      apiUrls.getAllUsersUrl
    )
  }

  updateUser(user: any) {
    return this.http.patch<any>(
      apiUrls.usersUrl + '/' + user.id,
      {
        "accountLocked": user.accountLocked,
      }
    )
  }

  deleteUser(id: number) {
    return this.http.delete<any>(
      apiUrls.usersUrl + '/' + id,
    )
  }
}
