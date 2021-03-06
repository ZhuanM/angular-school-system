import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrls } from './../shared/api-urls';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  authHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  login(username: string, password: string) {
    return this.http.post<any>(
      apiUrls.loginUrl,
      {
        "username": username,
        "password": password
      },
      { headers: this.authHeaders }
    )
  }

  register(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    role: string,
    school: any,
    classNumber: string,
    ) {
    if (role === 'STUDENT') {
      return this.http.post<any>(
        apiUrls.studentsUrl,
        {
          "firstName": firstName,
          "lastName": lastName,
          "username": username,
          "password": password,
          "email": email,
          "schoolId": school.id.toString(),
          "classId": classNumber
        }
      )
    } else if (role === 'PARENT') {
      return this.http.post<any>(
        apiUrls.parentsUrl,
        {
          "firstName": firstName,
          "lastName": lastName,
          "username": username,
          "password": password,
          "email": email,
        }
      )
    } else if (role === 'TEACHER') {
      return this.http.post<any>(
        apiUrls.teachersUrl,
        {
          "firstName": firstName,
          "lastName": lastName,
          "username": username,
          "password": password,
          "email": email,
          "schoolId": school.id.toString(),
        }
      )
    } else if (role === 'DIRECTOR') {
      return this.http.post<any>(
        apiUrls.createPrincipalUrl,
        {
          "firstName": firstName,
          "lastName": lastName,
          "username": username,
          "password": password,
          "email": email,
          "schoolId": school.id.toString(),
        }
      )
    }
  }

  getUser(role: string, id: number) {
    if (role == "STUDENT") {
      return this.http.get<any>(
        apiUrls.getStudentByIdUrl + '/' + id.toString() + ''
      )
    } else if (role == "PARENT") {
      return this.http.get<any>(
        apiUrls.getParentByIdUrl + '/' + id.toString() + ''
      )
    } else if (role == "TEACHER") {
      return this.http.get<any>(
        apiUrls.getTeacherByIdUrl + '/' + id.toString() + ''
      )
    } else if (role == "DIRECTOR") {
      return this.http.get<any>(
        apiUrls.getPrincipalByIdUrl + '/' + id.toString() + ''
      )
    } else if (role == "ADMIN") {
      return this.http.get<any>(
        apiUrls.usersUrl + '/' + id.toString() + ''
      )
    }
  }

  getSchools() {
    return this.http.get<any>(
      apiUrls.getSchoolsUrl
    )
  }
}
