import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {LoginDto} from "../dtos/users/login.dto";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber:string='';
  password:string='';
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
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
    this.userService.login(loginDto).subscribe(
      {
        next :(response:any) => {
          console.log(response)
        },

      }
    )

  }

}
