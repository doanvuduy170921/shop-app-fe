import { Component, OnInit } from '@angular/core';
import {PaymentMethodService} from "../../services/paymentMethod.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

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
  constructor(private payment:PaymentMethodService,private router:Router,private token:TokenService,private http:HttpClient) {
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

  placeOrder() {
    const ids = this.products.map(product => product.id);  // Lấy ID của các sản phẩm
    const orderReq = {
      address: this.userData.address,
      totalMoney: this.getTotalPrice(),
      shippingMethod: 'Standard',
      shippingAddress: this.userData.address,
      shippingDate: new Date(),  // Ngày vận chuyển hiện tại
      paymentMethod: this.selectedPaymentMethod
    };

    this.createOrder(orderReq, ids).subscribe(response => {
      console.log('Order placed successfully:', response);
      this.router.navigate(['/orders-confirm'], { state: { order: orderReq } });
    }, error => {
      console.error('Error placing order:', error);
    });
  }

  // Hàm gửi request tới API backend
  createOrder(orderReq: any, ids: number[]): Observable<any> {
    const apiUrl = `http://localhost:8080/api/v1/orders/${ids.join(',')}`;
    return this.http.post(apiUrl, orderReq);  // Gửi POST request
  }
}
