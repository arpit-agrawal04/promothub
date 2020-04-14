import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
export class ApiService {
  currentUserValue: any;
  apiUrl = environment.apiUrl;
    brew: any;
  token: string;
  constructor(private http: HttpClient,
    private router: Router) {
  }
  midWare(type, url, data) {
    this.token = localStorage.getItem('token')

      if (type === 'post') {
        this.brew = this.http.post(this.apiUrl + 'api/' + url, data)
      }
        if (!this.brew.sucess && this.brew.message === 'invalid token') {
            this.router.navigateByUrl('/login')
        } else {
            return this.brew
        }
    }
}
