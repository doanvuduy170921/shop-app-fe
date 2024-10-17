import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginDto} from "../../dtos/users/login.dto";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {TokenService} from "../../services/token.service";

import {RoleService} from "../../services/role.service";
import {AuthService} from "../../services/AuthService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!: NgForm;

  phoneNumber:string='';
  password:string='';
  roles :any[]=[];

  constructor(private router: Router,
              private userService: UserService,
              private tokenService: TokenService,
              private roleService: RoleService,
              private isLogin: AuthService
  ) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((data)=>{
      this.roles = data;
    })
  }
  onPhoneNumberChance(){
    console.log(`Phone Chance :+ ${this.phoneNumber}`);
  }


  login() {
    const loginDto: LoginDto = {
      "phoneNumber": this.phoneNumber,
      "password": this.password,
    };
    console.log(loginDto);

    this.userService.login(loginDto).subscribe({
      next: (response: any) => {
        console.log(response);
        const token = response.token;
        const user = response.user;  // Giả sử user chứa thông tin vai trò

        // Lưu token và thông tin người dùng
        this.tokenService.setToken(token);
        this.tokenService.setUser(JSON.stringify(user));
        this.isLogin.isAuthenticatedSubject.next(true);
        // Kiểm tra role_id và điều hướng
        if (user.role_id === 2) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
        console.log(response);
      },
      error: (error: any) => {
        alert(`Can not login, error : ${error.error}`);
      }
    });
  }


}
