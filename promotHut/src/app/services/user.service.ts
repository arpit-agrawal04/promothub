import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
@Injectable({
    providedIn: 'root'
  })
export class UserService {
  currentUserValue: any;
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
    loginUser(data) {
      this.currentUserValue = data.userId;
   return this.http.post(this.apiUrl + 'auth/loginUser', data)
    }
    signUp(data) {
      this.currentUserValue = data.userId;
   return this.http.post(this.apiUrl + 'auth/signup', data)
    }
}