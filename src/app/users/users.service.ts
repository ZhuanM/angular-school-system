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
      apiUrls.usersUrl
    )
  }

  createUser(user: any) {
    return this.http.post<any>(
      apiUrls.usersUrl,
      {
        "email": user.email,
        "fullName": user.fullName,
        "password": user.password,
        "username": user.username,
        "role": "USER"
      }
    )
  }

  updateUser(id: number, user: any) {
    // return this.http.patch<any>(
    //   apiUrls.usersUrl + '/${id}',
    //   {
    //     "firstName": user.firstName,
    //     "lastName": user.lastName,
    //     "username": user.username,
    //     "school": user.school,
    //     // "role": "USER"
    //   }
    // )
  }

  deleteUser(id: number) {
    // const httpParams = new HttpParams().set('id', id);
    // const options = { params: httpParams };

    // return this.http.delete<any>(
    //   apiUrls.usersUrl + '/${id}',

    //   // apiUrls.usersUrl + '/' + id,

    //   // apiUrls.usersUrl,
    //   // options
    // )
  }
}
