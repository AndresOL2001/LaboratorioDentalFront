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

  crearCategoria(categoriaCreacionDTO: CategoriaCreacion) {
    let fd = new FormData();
    fd.append("Nombre", categoriaCreacionDTO.Nombre);
    fd.append("Descripcion", categoriaCreacionDTO.Descripcion);
    fd.append("Imagen", categoriaCreacionDTO.Imagen);
    fd.append("Tipo", categoriaCreacionDTO.Tipo);
    return this.http.post(this.PRODUCCION + "categorias", fd);
  }

  getCategorias() {
    return this.http.get(this.PRODUCCION + "categorias");
  }

  getCategoriaById(id: number) {
    return this.http.get(this.PRODUCCION + `categorias/${id}`);

  }

  eliminarCategoriaById(id:number){
    return this.http.delete(this.PRODUCCION+`categorias/${id}`);
  }

  updateCategoriaById(id:number,categoriaCreacionDTO:CategoriaCreacion){

    let fd = new FormData();
    fd.append("Nombre", categoriaCreacionDTO.Nombre);
    fd.append("Descripcion", categoriaCreacionDTO.Descripcion);
    fd.append("Imagen", categoriaCreacionDTO.Imagen);
    fd.append("Tipo", categoriaCreacionDTO.Tipo);

    return this.http.put(this.PRODUCCION+`categorias/${id}`,categoriaCreacionDTO);

  }
  
}
