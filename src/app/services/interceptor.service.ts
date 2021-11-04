import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor{

  constructor( private firestore : Firestore) { }
  auth = getAuth(this.firestore.app);

  intercept(req: HttpRequest<any>  , next : HttpHandler) : any {
    let clone;
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const headers = new HttpHeaders({
          authorization : `${user.getIdToken}`
        })
       clone = req.clone();
      }
      else{
        clone = req;
      }
      return next.handle(clone);
    });

  }
}
