import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';
  constructor() {}
  // getter & setter
  getToken(){
    return localStorage.getItem(this.TOKEN_KEY);
  }
  setToken(token:string):void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getUser(){
    return localStorage.getItem('user');
  }
  setUser(user:any):void {
    localStorage.setItem('user', user);
  }
  removeToken():void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
