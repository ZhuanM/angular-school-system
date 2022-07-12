import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class SchoolsService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllSchools() {
    return this.http.get<any>(
      apiUrls.getSchoolsUrl
    )
  }

  createSchool(school: any) {
    return this.http.post<any>(
      apiUrls.schoolsUrl,
      {
        "name": school.name,
        "address": school.address
      }
    )
  }

  updateSchool(id: number, school: any) {
    return this.http.patch<any>(
      apiUrls.schoolsUrl + '/' + id,
      {
        "name": school.name,
        "address": school.address
      }
    )
  }

  deleteSchool(id: number) {
    return this.http.delete<any>(
      apiUrls.schoolsUrl + '/' + id,
    )
  }
}
