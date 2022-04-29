import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, OnChanges, ChangeDetectionStrategy, SimpleChanges, Input } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
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
    this.inicializarPermisos();
    this.sliderContent();
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
  sliderContent(){
    let slider:any = document.querySelector(".contenedor2-slider");
    let sliderIndividual = document.querySelectorAll(".contenido2-slider");
    let contador = 1;
    let width = sliderIndividual[0].clientWidth;
    let intervalo = 5000;

    window.addEventListener("resize", function(){
     width = sliderIndividual[0].clientWidth;
    })

    setInterval(function(){
      slides();
    }, intervalo);

    function slides(){
      slider.style.transform = "translateX("+(-width*contador)+"px)";
      slider.style.trasition = "transform .1s"
      contador++;

      if(contador == sliderIndividual.length){
        setTimeout(function(){
          slider.style.transform = "traslateX(0px)";
          slider.style.transition = "transform 0s"; 
          contador = 1;
               } ,1500)
      }
    }
   }

}
