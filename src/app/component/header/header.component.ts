import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 isLogged !:boolean;
  constructor(public authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate([''])
  }
}
