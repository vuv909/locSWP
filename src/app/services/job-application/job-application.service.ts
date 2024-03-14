import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = ['http://localhost:8081/'];

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  constructor(private http: HttpClient) {}

  applyJobApplication(data: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/jobApply/createJobApply', data);
  }

  viewJobApplicationByEmail(email: string , page : number): Observable<any> {
    return this.http.get(BASIC_URL + 'api/jobApply/view/' + email+"?page="+page);
  }

  viewJobApplicationByHrEmail(email: string,status : string): Observable<any> {
    return this.http.get(BASIC_URL + 'api/jobApply/view/hremail/' + email + "/"+status);
  }

  updateJobApplicationByHrEmail(data: any): Observable<any> {
    return this.http.put(BASIC_URL + 'api/jobApply/updateJobApply', data);
  }
}
