import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {environment} from "../../environments/environment";
import {CategoryService} from "../../services/category.service";
import { Router } from '@angular/router';

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
  page= 0;
  categories: any[] = [];
  selectedCategoryId: number = 0;

  keyword: string = "";

  constructor(private productService: ProductService, private categoryService: CategoryService,private router: Router) { }

  ngOnInit(): void {
    this.loadProducts(this.keyword,this.selectedCategoryId,this.currentPage, this.limit);
    this.loadCategories();

  }

  loadProducts(keyword:string,category_id:number,page: number, limit: number) {
    this.productService.getProducts(keyword, category_id,page, limit).subscribe(response => {
      this.products = response.products.map((product: Product) => {
        // Thêm đường dẫn đầy đủ cho hình ảnh
        console.log("before", product.thumbnail)
        product.thumbnail = this.productService.getImageUrl(product.thumbnail);
        return product;
      });
      console.log(this.products )
      this.totalPage = response.totalPage;
    }, error => {
      console.log('Error fetching products:', error);
    });
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    })
  }


  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.loadProducts(this.keyword,this.selectedCategoryId,this.currentPage, this.limit);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts(this.keyword,this.selectedCategoryId,this.currentPage, this.limit);
    }
  }

  searchProduct() {
    this.currentPage = 0;
    console.log(this.selectedCategoryId)
    this.loadProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.limit);
  }

  onProductClick(productId:number) {
    console.log(productId)
    this.router.navigate(['/product/detail',productId]);
  }


  clearSearch() {
    this.keyword = '';
    this.currentPage = 0;
    this.loadProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.limit);
  }
}
