import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURl = 'http://localhost:3000/api/';

  httpClient = inject(HttpClient)

  get accessToken() {
    return localStorage.getItem('accessToken')
  }

  get refreshToken() {
    return localStorage.getItem('refreshToken')
  }

  signUp(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURl + 'auth/signup', userData);
  }

  login(email: string, password: string): Observable<{
    token: {
      accessToken: string,
      refreshToken: string,
    },
    user: any
  }> {
    return this.httpClient.post<any>(this.apiURl + 'auth/login', {email, password});
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  token(refreshToken: string): Observable<{
    token: {
      accessToken: string,
      refreshToken: string,
    },
    user: any
  }> {
    return this.httpClient.post<any>(this.apiURl + 'auth/token', {refreshToken});
  }

  project() {
    return this.httpClient.get(this.apiURl + 'project/all')
  }


  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

}
