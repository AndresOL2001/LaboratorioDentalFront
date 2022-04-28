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
    this.sliderContent();
  }

  sliderContent(){
    let slider:any = document.querySelector(".contenedor-slider");
    let sliderIndividual = document.querySelectorAll(".contenido-slider");
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
