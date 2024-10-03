import { Component, OnInit } from '@angular/core';
import {PaymentMethodService} from "../../services/paymentMethod.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  userData: any = {
    fullname: '',
    address: '',
    phone_number: ''
  };

  paymentMethods: string[] = [];
  products: any[] = [];
  selectedPaymentMethod: string = '';
  constructor(private payment:PaymentMethodService,private router:Router,private token:TokenService) {
  }
  ngOnInit() {
    // Lấy sản phẩm đã chọn từ local storage
    const selectedProducts = localStorage.getItem('selectedProducts');
   this.products = selectedProducts ? JSON.parse(selectedProducts) : [];
    this.getPayment();
    this.loadUserData();
  }

  getPayment(){
    this.payment.getPaymentMethod().subscribe((response) => {
      this.paymentMethods = response;
    })
  }
  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0); // Giá trị ban đầu của `total` là 0
  }

  loadUserData() {
    const userDataString = this.token.getUser();
    if (userDataString) {
      const userDataObj = JSON.parse(userDataString);
      this.userData = {
        fullname: userDataObj.fullname || '',
        address: userDataObj.address || '',
        phone_number: userDataObj.phone_number || ''
      };
    }
  }
}
