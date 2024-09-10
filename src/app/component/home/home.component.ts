import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  totalPage: number = 0;
  currentPage: number = 0;
  limit: number = 12; // Giới hạn số sản phẩm mỗi trang

  keyword: string = "";
  category_id: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts(this.keyword,this.category_id,this.currentPage, this.limit);
  }

  loadProducts(keyword:string,category_id:number,page: number, limit: number) {
    this.productService.getProducts(keyword, category_id,page, limit).subscribe(response => {
      this.products = response.products.map((product: Product) => {
        // Thêm đường dẫn đầy đủ cho hình ảnh
        product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        return product;
      });
      this.totalPage = response.totalPage;
    }, error => {
      console.log('Error fetching products:', error);
    });
  }



  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.loadProducts(this.keyword,this.category_id,this.currentPage, this.limit);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts(this.keyword,this.category_id,this.currentPage, this.limit);
    }
  }

}
