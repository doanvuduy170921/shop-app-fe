import { HttpClient } from "@angular/common/http";
import {Observable, BehaviorSubject, tap} from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { ProductResponse } from "../responses/product/product.response";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiBaseUrl}/carts/user-cart`;
  private cartSubject = new BehaviorSubject<ProductResponse[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateCartState();
  }

  getListCartByUser(): Observable<{ listCart: ProductResponse[] }> {
    return this.http.get<{ listCart: ProductResponse[] }>(this.apiUrl);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    const requestBody = {
      productId: productId,
      quantity: quantity
    };
    return this.http.post(`${environment.apiBaseUrl}/carts/add-to-cart`, requestBody).pipe(
      tap(() => this.updateCartState())
    );
  }

  updateCartState(): void {
    this.getListCartByUser().subscribe(response => {
      this.cartSubject.next(response.listCart);
    });
  }
}
