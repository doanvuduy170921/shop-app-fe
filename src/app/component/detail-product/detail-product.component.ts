import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CartService} from "../../services/cart.service";
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product: Product | undefined;
  productId!:number ;
  imageUrls: string[] = [];
  selectedImageUrl!: string;

  quantity: number = 1;
  constructor(private productService: ProductService, private route: ActivatedRoute
              ,private http: HttpClient,private router: Router,private cartService: CartService) { }

  ngOnInit(): void {
    // Lấy productId từ URL
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;  // Chuyển tham số 'id' thành number
      this.loadProduct(this.productId);
    });
    this.productService.getListImage(this.productId).subscribe({
      next: (urls) => {
        this.imageUrls = urls;
        console.log(this.imageUrls);
        this.selectedImageUrl = this.imageUrls[0];
      },
      error: (err) => console.error('Error fetching images', err)
    });



  }
  loadProduct(productId:number) {
    this.productService.getDetailProduct(productId).subscribe(response => {
      this.product = response;
      if (this.product && this.product.thumbnail) {
        this.product.thumbnail = this.productService.getImageUrl(this.product.thumbnail);
      }
      console.log(this.product )
    })
  }
  onImageClick(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;  // Thay đổi ảnh chính khi nhấp vào thumbnail
  }



  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addToCart() {
    const productId = this.product?.id;
    if (productId) {
      this.cartService.addToCart(productId, this.quantity).subscribe(
        response => {
          console.log('Product added to cart:', response);
        },
        error => {
          console.error('Error adding product to cart:', error);
        }
      );
    }
  }


}
