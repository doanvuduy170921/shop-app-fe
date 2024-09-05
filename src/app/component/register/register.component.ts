import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {RegisterDto} from "../../dtos/users/register.dto";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string;
  password: string;
  retypePassword:string;
  fullName:string;
  address:string;
  isAccepted:boolean;
  dateOfBirth:Date;

  constructor(private router: Router, private userService: UserService) {
    this.phoneNumber = ''
    this.password = ''
    this.retypePassword = ''
    this.fullName = ''
    this.address = ''
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    //inject
  }

  ngOnInit(): void {
  }
  onPhoneNumberChance(){
    console.log(`Phone Chance :+ ${this.phoneNumber}`);
  }
  register(){
    const message = `phone: ${this.phoneNumber}`+
      `password: ${this.password}`+
      `retypePassword: ${this.retypePassword}`+
      `fullName: ${this.fullName}`+
      `address: ${this.address}`+
      `isAccepted: ${this.isAccepted}`;

    //alert(message);

    const registerDto : RegisterDto ={
      "fullname":this.fullName,
      "phone_number":this.phoneNumber,
      "address":this.address,
      "password":this.password,
      "retype_password":this.retypePassword,
      "date_of_birth":this.dateOfBirth,
      "facebook_account_id":0,
      "google_account_id":0,
      "role_id":1
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.userService.register(registerDto).subscribe(
      {
        next :(response:any) => {
          debugger
          // Xử lý kết quả trả về khi đăng kí thành công
          if(response && response.status === 200 || response.status === 201) {
            // Đăng kí thành công chuyển sang màn hình login
            this.router.navigate(['/login']);
          }else {
            // Xử lý trường hợp login không thành công nếu cần
          }
        },
        complete:() => {
          debugger
        },
        error :(error:any) => {
          // Xử lý lỗi nếu có
          alert(`Can not register, error : ${ error.error}`);
        }
      }
    )

  }

  checkPasswordMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch': true});
    }
    else{
      this.registerForm.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge(){
    if(this.dateOfBirth){
      const today = new Date();
      const  birthDay = new Date(this.dateOfBirth);
      let age =today.getFullYear() - birthDay.getFullYear();
      const monthDiff = today.getMonth() - birthDay.getMonth();
      if(monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDay.getDate()){
        age --;
      }
      if(age <18){
        this.registerForm.form.controls['dateOfBirth'].setErrors({'InvalidAge':true});
      }else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
