import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetProduct = `${environment.apiBaseUrl}/categories/get-all`;

  constructor(private http: HttpClient) {}

  getCategories():Observable<any[]>{
    return this.http.get<any[]>(this.apiGetProduct);
  }
}
