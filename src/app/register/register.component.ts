import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  phone: string;
  password: string;
  retypePassword:string;
  fullName:string;
  address:string;
  isAccepted:boolean;
  dateOfBirth:Date;
  constructor() {
    this.phone = ''
    this.password = ''
    this.retypePassword = ''
    this.fullName = ''
    this.address = ''
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  ngOnInit(): void {
  }
  onPhoneChance(){
    console.log(`Phone Chance :+ ${this.phone}`);
  }
  register(){
    const message = `phone: ${this.phone}`+
      `password: ${this.password}`+
      `retypePassword: ${this.retypePassword}`+
      `fullName: ${this.fullName}`+
      `address: ${this.address}`+
      `isAccepted: ${this.isAccepted}`;

    alert(message);
  }

  checkPasswordMatchs(){
    if(this.password != this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch': true});
    }
    else{
      this.registerForm.controls['retypePassword'].setErrors(null);
    }
  }
}
