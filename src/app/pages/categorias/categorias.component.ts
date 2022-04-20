import { AfterContentInit, AfterViewInit, Component,  OnChanges,  OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { ServiciosComponent } from '../servicios/servicios.component';
import { CategoriasService } from '../../services/categorias.service';
import { ProductoService } from '../../services/producto.service';
import {map} from 'rxjs/operators'
import { Producto } from 'src/app/models/Producto';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private categoriaService:CategoriasService,private productoService:ProductoService) {
  
   }
 
   productos:Producto[] = []; 


  categoriaActualId

  categoriaActual:Categoria = {
    id:0,
    nombre:"",
    Imagen:"",
    descripcion:"",
    tipo:""
  };

  ngOnInit(): void {
    this.categoriaActualId =JSON.parse(localStorage.getItem("id"));
    console.log(this.categoriaActualId);
    this.getCategoriaById();
    this.getProductos();
  }

  getCategoriaById(){
    this.categoriaService.getCategoriaById(this.categoriaActualId).subscribe((resp:Categoria) => {
      
      this.categoriaActual=resp;

    })
  }

  getProductos(){
    this.productoService.getProductos().subscribe( (resp:Producto[]) => {
      this.productos = resp.filter(x=> x.categoriaId == this.categoriaActualId);
      console.log(this.productos);
    })
  }
 
}
