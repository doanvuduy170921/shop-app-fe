import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import {Product} from "../models/product";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiGetProducts = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(keyword:string,category_id:number, page: number, limit: number): Observable<any> {
    const token = localStorage.getItem('token');
    console.log("-->" + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.apiBaseUrl}/products/getAllProduct?keyword=${keyword}&category_id=${category_id}&page=${page}&limit=${limit}`,{ headers });
  }
  getImageUrl(imageName: string) {
    return  `${environment.apiBaseUrl}/products/images/${imageName}`;
  }

  getDetailProduct(productId:number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
  }
  getListImage(productId:number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/products/list-image/${productId}`);
  }

}
