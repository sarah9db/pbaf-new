import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  constructor(private http: HttpClient) { }
  //private apiUrl = 'http://localhost:3000'
  postSignUp(userData: any){
    let response = this.http.post('/signup', userData);
    return response
  }
}
