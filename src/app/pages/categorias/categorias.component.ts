import {

  Component,

  OnInit,

} from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { ProductoService } from '../../services/producto.service';
import * as sha1 from 'js-sha1';
import { Producto } from 'src/app/models/Producto';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService,
    private routerLink:Router,
    private route: ActivatedRoute
  ) {}

  productos: Producto[] = [];
  loading:boolean=true;
  categoriaActualId;


  categoriaActual: Categoria = {
    id: 0,
    nombre: '',
    Imagen: '',
    descripcion: '',
    tipo: '',
  };
    
  
  ngOnInit(): void {
    this.categoriaActualId = JSON.parse(localStorage.getItem('id'));
    console.log(this.categoriaActualId);
    this.getCategoriaById();
    this.getProductos();
  }

  getCategoriaById() {
    this.categoriaService
      .getCategoriaById(this.categoriaActualId)
      .subscribe((resp: Categoria) => {
        this.categoriaActual = resp;
      });
  }

  getProductos() {
    this.productoService.getProductos().subscribe((resp: Producto[]) => {
      this.productos = resp.filter(
        (x) => x.categoriaId == this.categoriaActualId
      );
        this.loading=false;
     // console.log(this.productos);
    });
  }

  sha(number:number){
    console.log(number);
    localStorage.setItem("idProducto",number.toString());
    return sha1(number.toString());
  }

  volverAtras(){
    history.go(-1);
  }

  router(number:number){
    let id:number = this.sha(number)

    this.routerLink.navigate([ `./productos/${id}`],{relativeTo: this.route});
  }
}
