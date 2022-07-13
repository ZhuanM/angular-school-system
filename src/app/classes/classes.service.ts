import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class ClassesService {
  constructor(
    private http: HttpClient,
  ) {}

  getClasses(role: string, classId: any) {
    if (role == "DIRECTOR" || role == "ADMIN") {
      return this.http.get<any>(
        apiUrls.getAllClassesTeachersUrl
      )
    }
  }

  deleteClass(id: number) {
    return this.http.delete<any>(
      apiUrls.deleteClassTeachersUrl + '/' + id,
    )
  }
}
