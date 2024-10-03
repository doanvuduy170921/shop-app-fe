import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {LoginDto} from "../../dtos/users/login.dto";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {TokenService} from "../../services/token.service";
import {LoginResponse} from "../../responses/user/login.response";
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
  login(){
    const message = `phone: ${this.phoneNumber}`+
                    `password: ${this.password}`
    //alert(message);
    const loginDto : LoginDto ={
      "phoneNumber":this.phoneNumber,
      "password":this.password,
    }
    console.log(loginDto)
    this.userService.login(loginDto).subscribe({
        next : (response:any) => {
          console.log(response)
          const token = response.token;
          const user = response.user;
          this.tokenService.setToken(token);
          this.tokenService.setUser(JSON.stringify(user));
        this.isLogin.isAuthenticatedSubject.next(true);
          this.router.navigate(['/home']);
          console.log(response)
        },
        complete:() =>{
        },
        error:(error:any) => {
          alert(`Can not login, error : ${ error.error}`);
        }
      }
    )

  }

}
