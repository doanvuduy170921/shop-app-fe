export class LoginDto {

  phoneNumber: string;

  password: string;

  constructor(data:any) {
  this.phoneNumber = data.phoneNumber;
  this.password = data.password;

  }

}
