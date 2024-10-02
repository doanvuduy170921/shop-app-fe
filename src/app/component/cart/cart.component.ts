import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {ProductResponse} from "../../responses/product/product.response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: ProductResponse[] = [];

  selectedProducts: any[] = [];
  constructor(private cartService: CartService,private productService: ProductService,private router: Router) { }

  ngOnInit() {
    this.getCart();
  }
  getCart() {
    this.cartService.getListCartByUser().subscribe((response) => {
      console.log(response);  // Debug để kiểm tra cấu trúc trả về
      this.products = response.listCart.map(
        (item: any) => {
          item.thumbnail =  this.productService.getImageUrl(item.thumbnail);
          return item;
        }
      );  // Gán đúng mảng listCart vào products

    });
  }
  handlerTotal(product:any){
    return product.price * product.quantity;
  }
  onProductSelectionChange(event: any) {
    console.log('Selected products:', this.selectedProducts);
    // selectedProducts sẽ chứa tất cả các sản phẩm được chọn (bao gồm khi chọn tất cả)
  }

  selectedAll($event: MouseEvent) {
    console.log('Selected products:', this.selectedProducts);
  }

 /* placeOrder() {
    if (this.selectedProducts.length > 0) {
      // Lưu sản phẩm đã chọn vào local storage hoặc service để chia sẻ giữa các component
      localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
      this.router.navigate(['/orders']); // Chuyển đến trang đặt hàng
    } else {
      alert('Vui lòng chọn ít nhất một sản phẩm để đặt hàng.');
    }
  }*/
}
