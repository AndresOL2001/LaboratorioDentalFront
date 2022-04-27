import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from '../../services/producto.service';
import * as sha1 from 'js-sha1';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService:ProductoService,private usuarioService:UsuarioService) { }
  //Usuario sesion
  modelo = {
    rol:'',
    nombre:''
  };
  loading:boolean = true;

  productoIdActual:number;
  
  productoActual:Producto={
    productoNombre:"",
    categoriaId:[0],
    descripcion:"",
    id:0,
    precio:0,
    imagen:"",
    cantidadEnStock:0,
    categorias:[]
  };

  ngOnInit(): void {
    this.productoIdActual = JSON.parse(localStorage.getItem('idProducto'));
    //console.log(this.categoriaActualId);
    this.getProductoById();
    this.inicializarPermisos();
  }
  getProductoById() {
    this.productoService.getProductoById(this.productoIdActual).subscribe( (resp:Producto) => {
      this.productoActual = resp;
      console.log(this.productoActual);
      this.loading = false;
    })
  
  }

  
  abrirMenu(){

    const menu_items = document.querySelector('.menu_items')
    menu_items.classList.toggle('show')
      
    }
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
   getNombre(){
    return this.modelo.nombre.split(' ')[0];
  }

  volverAtras(){
    history.go(-1);
  }

  sha(number:number){
    return sha1(number.toString());
  }
}
