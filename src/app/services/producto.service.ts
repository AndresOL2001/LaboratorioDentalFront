import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoCreacion } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements HttpInterceptor {

  private URL_API = environment.urlLocal;

  private PRODUCCION = 'https://depositodentalapi.herokuapp.com/api/'

  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    })
    return next.handle(req);
  }

  getProductos() {
    return this.http.get(this.PRODUCCION + 'productos');
  }

  getProductoById(id: number) {
    return this.http.get(this.PRODUCCION + `productos/${id}`);

  }

  crearProducto(productoCreacionDTO: ProductoCreacion) {
    let fd = new FormData();
    fd.append("ProductoNombre", productoCreacionDTO.ProductoNombre);
    fd.append("Descripcion", productoCreacionDTO.Descripcion);
    fd.append("CantidadEnStock", productoCreacionDTO.CantidadEnStock.toString());
    fd.append("Precio", productoCreacionDTO.precio.toString());
    fd.append("Imagen", productoCreacionDTO.imagen);
    fd.append("categoriaProductosIds", JSON.stringify(productoCreacionDTO.categoriaProductosIds));

    return this.http.post(this.PRODUCCION + `productos`, fd);

  }

  eliminarProductoById(id:number){
    return this.http.delete(this.PRODUCCION+`productos/${id}`);
  }
}
