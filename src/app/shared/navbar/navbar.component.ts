import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, OnChanges } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usuarioService:UsuarioService) { 

  }



  ngOnInit(): void {
    console.log(this.modelo.rol);
    this.inicializarPermisos();
  }

  modelo = {
    rol:'',
    nombre:''
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

  cerrarSesion(){
    localStorage.removeItem("claims");
    this.modelo={
      rol:"",
      nombre:""
    }
  }

}
