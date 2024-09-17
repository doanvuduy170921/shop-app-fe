import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiGetProducts = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(keyword:string,category_id:number, page: number, limit: number): Observable<any> {
    const params = {
      keyword: keyword || '',
      category_id: category_id.toString(), // Truyền categoryId dưới dạng chuỗi
      page: page.toString(),
      limit: limit.toString()
    };

    return this.http.get(`${environment.apiBaseUrl}/products/getAllProduct?keyword=${keyword}&category_id=${category_id}&page=${page}&limit=${limit}`);
  }


}
