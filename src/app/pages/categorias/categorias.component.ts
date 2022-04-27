import {

  Component,

  OnInit,

} from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { ProductoService } from '../../services/producto.service';
import * as sha1 from 'js-sha1';
import { Producto } from 'src/app/models/Producto';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from 'src/environments/environment';
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
    private usuarioService:UsuarioService,
    private routerLink:Router,
    private route: ActivatedRoute
  ) {}

  productos: Producto[] = [];
  loading:boolean=true;
  categoriaActualId;

  modelo = {
    rol:'',
    nombre:''
  };

  categoriaActual: Categoria = {
    id: 0,
    nombre: '',
    Imagen: '',
    descripcion: '',
    tipo: '',
  };

  inicializarPermisos(){
    this.usuarioService.obtenerRolActualUsuario().subscribe(resp => {
      let claims;
      if(localStorage.getItem("claims")){
        claims = JSON.parse(localStorage.getItem(("claims")));
      }
     this.modelo.rol = claims ? claims[environment.rol] : ''
     this.modelo.nombre =claims ? claims[environment.nombre] : '';
     })
    
   }

   abrirMenu(){

    const menu_items = document.querySelector('.menu_items')
    menu_items.classList.toggle('show')
      
    }
    
   getNombre(){
    return this.modelo.nombre.split(' ')[0];
  }
  ngOnInit(): void {
    this.categoriaActualId = JSON.parse(localStorage.getItem('id'));
    console.log(this.categoriaActualId);
    this.getCategoriaById();
    this.getProductos();
    this.inicializarPermisos();
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
