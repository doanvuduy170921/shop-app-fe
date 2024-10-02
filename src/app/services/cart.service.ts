import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {ProductResponse} from "../responses/product/product.response";


@Injectable({
  providedIn: 'root'
})
export class CartService{
  private apiUrl =`${environment.apiBaseUrl}/carts/user-cart`;
  constructor(private http:HttpClient) {}
  private cartSubject = new BehaviorSubject<any[]>([]);
  getListCartByUser(): Observable<{ listCart: ProductResponse[] }> {
    return this.http.get<{ listCart: ProductResponse[] }>(this.apiUrl);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    const requestBody = {
      productId: productId,
      quantity: quantity
    };
    return this.http.post(`${environment.apiBaseUrl}/carts/add-to-cart`, requestBody).pipe(
      // Sau khi thêm sản phẩm vào giỏ hàng thành công, cập nhật BehaviorSubject
      tap((response: any) => {
        this.updateCartState();
      })
    );
  }
  updateCartState(): void {
    this.http.get<any[]>(`${this.apiUrl}/user-cart`).subscribe(cart => {
      this.cartSubject.next(cart);  // Cập nhật giỏ hàng trong BehaviorSubject
    });
  }

}
