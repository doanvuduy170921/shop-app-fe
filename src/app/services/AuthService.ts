
// auth.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Tạo một BehaviorSubject để lưu trữ trạng thái đăng nhập
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  isLoggedIn() {
    const token = localStorage.getItem("access_token");
    if (token === '' || token === null || token === undefined) {
      return false;
    }else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem("access_token");
    return false;
  }


}
