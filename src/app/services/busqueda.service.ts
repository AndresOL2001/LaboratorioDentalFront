import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService implements HttpInterceptor{

  private URL_API = environment.urlLocal;

  private PRODUCCION = 'https://depositodentalapi.herokuapp.com/api/'


  constructor(private http: HttpClient) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
  });


    return next.handle(req);
  }

  buscarTodo(modelo:string,termino:string){
    return this.http.get(this.PRODUCCION+`Busqueda/${modelo}/${termino}`);
  }
  
}
