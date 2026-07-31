import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private basrurl = 'http://localhost:2005/api/users' ;

  constructor(private http: HttpClient) {}

  register( data : {name: string, age: number, email: string, password: string}){
    return this.http.post(`${this.basrurl}/signup` , data);
  }

  login(data : {email: string, password: string }){
    return this.http.post(`${this.basrurl}/login` , data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
