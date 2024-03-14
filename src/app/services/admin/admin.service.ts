import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

const BASIC_URL = ['http://localhost:8081/'];

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAccountByEnabledStatus(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${StorageService.getToken()}`,
    });
    return this.http.post(BASIC_URL + 'api/admin/accounts', data, {
      headers: headers,
    });
  }

  blockAndActiveAccount(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${StorageService.getToken()}`,
    });
    return this.http.post(BASIC_URL + 'api/admin/blockAccount', data, {
      headers: headers,
    });
  }

  createAccountHR(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${StorageService.getToken()}`,
    });
    return this.http.post(BASIC_URL + 'api/admin/createAccount', data, {
      headers: headers,
    });
  }
}
