import { Component, OnInit } from '@angular/core';
import {OrderDto} from "../../dtos/order/OrderDto";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  orders: OrderDto[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();

  }

  loadOrders() {
    const username = 'some-username';
    this.orderService.getAllOrderByUser().subscribe(data => {
      this.orders = data;
      console.log(this.orders)
    });
  }

  expandedRows: { [key: string]: boolean } = {};

  onRowExpand(event: any) {
    const orderCode = event.data.order_code;
    this.expandedRows[orderCode] = true;
    // Thêm logic bổ sung nếu cần, ví dụ: tải thêm dữ liệu chi tiết
  }

  onRowCollapse(event: any) {
    const orderCode = event.data.order_code;
    delete this.expandedRows[orderCode];
  }
}
