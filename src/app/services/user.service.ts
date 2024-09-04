import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterDto} from "../dtos/users/register.dto";
import {LoginDto} from "../dtos/users/login.dto";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiConfig = {headers : this.createHeaders()}

  constructor(private http: HttpClient) { }
  private createHeaders(): HttpHeaders {
    return  new HttpHeaders(
      {'Content-Type': 'application/json',
      'Accept - Language': 'vi'});
  }

  register(registerDto:RegisterDto):Observable<any> {
    return this.http.post(this.apiRegister, registerDto,this.apiConfig)
  }

  login(loginDto:LoginDto):Observable<any> {
    return this.http.post(this.apiLogin, loginDto,this.apiConfig )
  }
}
