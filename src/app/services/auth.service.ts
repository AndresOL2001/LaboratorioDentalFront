import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { UsuarioCreacion } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements HttpInterceptor {

  private URL_API = environment.urlLocal;

  private PRODUCCION = 'https://depositodentalapi.herokuapp.com/api/';
  constructor(private http:HttpClient)  { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
  });


    return next.handle(req);

  }

  login(usuarioLogin:Login){

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let options = {
      headers: headers,
      withCredentials:false
      
   }
 
    return this.http.post(this.PRODUCCION+'auth/login',usuarioLogin,options);
  }

  crearUsuario(productoCreacionDTO: UsuarioCreacion) {
    

    return this.http.post(this.PRODUCCION + `auth/registro`, productoCreacionDTO);

  }

}
