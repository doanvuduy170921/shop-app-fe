import { Injectable } from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from "@angular/common/http";
import { Observable } from "rxjs";
import {TokenService} from "../services/token.service";

@Injectable()
export class TokenInterceptor  implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
      console.log(token, "inside")
        if(token){
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            },
          });
        }
        return next.handle(req);
    }

}
export const authInterceptor =[
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
]
