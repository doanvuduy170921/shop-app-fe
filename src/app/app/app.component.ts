import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }


  login() {
    this.router.navigate(['/home']); // Chuyển đến trang home sau khi đăng nhập
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
