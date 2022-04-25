import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { CategoriasService } from '../../services/categorias.service';
import * as sha1 from 'js-sha1';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  
  //Usuario sesion
  modelo = {
    rol:'',
    nombre:''
  };

  categorias:Categoria[]=[];
  producto:Producto;
  productoIdActual:number;
  loading:boolean = true;

  constructor(private usuarioService:UsuarioService,private categoriasService:CategoriasService) {
 
   }
   getNombre(){
     return this.modelo.nombre.split(' ')[0];
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

   cerrarSesion(){
     localStorage.removeItem("claims");
     this.modelo={
       rol:"",
       nombre:""
     }
   }
 

  ngOnInit(): void {  
    this.inicializarPermisos();
    this.getCategorias();

    
   
  }
  


  abrirMenu(){

    const menu_items = document.querySelector('.menu_items')
    menu_items.classList.toggle('show')
      
    }
  
 getCategorias(){
   this.categoriasService.getCategorias().subscribe( (categorias:Categoria[]) => {
    this.categorias = categorias;
    this.loading = false;
  })
 }

 sha(number:number){
   return sha1(number.toString());
 }
 obtenerIdCategoriaActual(number:number){
  localStorage.setItem("id",number.toString());
 }
 
}
