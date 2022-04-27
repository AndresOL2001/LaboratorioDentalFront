import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private usuarioService:UsuarioService) { }
  modelo = {
    rol:'',
    nombre:''
  };
  ngOnInit(): void {
    this.inicializarPermisos();
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
  abrirMenu(){

  const menu_items = document.querySelector('.menu_items')
  menu_items.classList.toggle('show')
    
  }

}
