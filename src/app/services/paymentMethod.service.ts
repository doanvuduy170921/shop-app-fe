import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PaymentMethodService {
  private baseUrl = `${environment.apiBaseUrl}/payment-method/`;
  constructor(private http: HttpClient) {}

  getPaymentMethod():Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}`);
  }
}
