import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class SubjectsService {
  constructor(
    private http: HttpClient,
  ) {}

  getSubjects(role: string, teacherId?: any) {
    if (role == "TEACHER") {
      return this.http.get<any>(
        apiUrls.getSubjectsByTeacherIdUrl + '/' + teacherId + '/courses'
      )
    } else if (role == "DIRECTOR") {
      return this.http.get<any>(
        apiUrls.subjectsUrl
      )
    } else if (role == "ADMIN") {
      return this.http.get<any>(
        apiUrls.subjectsUrl
      )
    }
  }

  createSubject(subject: any) {
    return this.http.post<any>(
      apiUrls.subjectsUrl,
      {
        "name": subject.name,
      }
    )
  }

  deleteSubject(id: number) {
    return this.http.delete<any>(
      apiUrls.subjectsUrl + '/' + id,
    )
  }
}
