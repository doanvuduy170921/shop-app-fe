import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductResponse } from "../../responses/product/product.response";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  products: ProductResponse[] = [];
  selectedProducts: any[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.products = cart.map(item => ({
        ...item,
        thumbnail: this.productService.getImageUrl(item.thumbnail)
      }));
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  handlerTotal(product: any) {
    return product.price * product.quantity;
  }

  onProductSelectionChange(event: any) {
    console.log('Selected products:', this.selectedProducts);
  }

  selectedAll($event: MouseEvent) {
    console.log('Selected products:', this.selectedProducts);
  }

  placeOrder() {
    if (this.selectedProducts.length > 0) {
      localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
      this.router.navigate(['/orders']);
    } else {
      alert('Vui lòng chọn ít nhất một sản phẩm để đặt hàng.');
    }
  }
}
