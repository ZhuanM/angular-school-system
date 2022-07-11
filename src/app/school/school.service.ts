import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class SchoolService {
  constructor(
    private http: HttpClient,
  ) {}

  getSchool() {
    return this.http.get<any>(
      apiUrls.schoolsUrl
    )
  }
}
