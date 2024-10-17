import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userData: any = {
    name : '',
    address : '',
    phone_number : '',
  }
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  this.loadUserInfo();
  }
  loadUserInfo() {
    const user = this.tokenService.getUser();
    if(user){
      const userObject = JSON.parse(user);
      this.userData = {
        name : userObject.fullname || '',
        address: userObject.address,
        phone_number :  userObject.phone_number,
      }
    }
  }

}
