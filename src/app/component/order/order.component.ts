import { Component, OnInit } from '@angular/core';
import {PaymentMethodService} from "../../services/paymentMethod.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  paymentMethods: string[] = [];
  products: any[] = [];
  selectedPaymentMethod: string = '';
  constructor(private payment:PaymentMethodService,private router:Router) {
  }
  ngOnInit() {
    // Lấy sản phẩm đã chọn từ local storage
    const selectedProducts = localStorage.getItem('selectedProducts');
    this.products = selectedProducts ? JSON.parse(selectedProducts) : [];
    this.getPayment();
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

  placeOrder() {
    // Lưu danh sách sản phẩm vào localStorage
    localStorage.setItem('orderedProducts', JSON.stringify(this.products));

    // Điều hướng sang trang xác nhận
    this.router.navigate(['/orders-confirm']);
  }
}
