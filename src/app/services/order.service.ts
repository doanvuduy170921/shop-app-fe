import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../models/order";
import {OrderDto} from "../dtos/order/OrderDto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.apiBaseUrl}/orders`;
  createOrder(orderDto: Order, cartIds: number[]): Observable<Order> {
    const url = `${this.apiUrl}/${cartIds.join(',')}`;  // Gắn các IDs của cart vào URL
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Order>(url, orderDto, { headers });
  }

  getAllOrderByUser():Observable<OrderDto[]>{
    const url = `${environment.apiBaseUrl}/orders/get-all-by-user`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<OrderDto[]>(url, { headers });
  }
}
