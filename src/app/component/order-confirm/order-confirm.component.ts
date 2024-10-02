import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {

  products: any[] = [];

  ngOnInit() {
    // Lấy danh sách sản phẩm từ localStorage
    const orderedProducts = localStorage.getItem('orderedProducts');
    this.products = orderedProducts ? JSON.parse(orderedProducts) : [];
  }
}
