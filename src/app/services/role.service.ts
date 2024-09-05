import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiRole = `${environment.apiBaseUrl}/roles`;

  constructor(private httpClient: HttpClient) {
  }
  getRoles():Observable<any> {
    return this.httpClient.get<any[]>(this.apiRole);
  }
}
