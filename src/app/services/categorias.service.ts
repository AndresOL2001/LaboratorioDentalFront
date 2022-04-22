import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria, CategoriaCreacion } from '../models/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService implements HttpInterceptor {

  private URL_API = environment.urlLocal;

  private PRODUCCION = 'https://depositodentalapi.herokuapp.com/api/'


  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    })
    return next.handle(req);

  }

  crearCategoria(categoria: CategoriaCreacion) {
    return this.http.post(this.PRODUCCION + "categorias", categoria);
  }

  getCategorias() {
    return this.http.get(this.PRODUCCION + "categorias");
  }

  getCategoriaById(id: number) {
    return this.http.get(this.PRODUCCION + `categorias/${id}`);

  }
}
