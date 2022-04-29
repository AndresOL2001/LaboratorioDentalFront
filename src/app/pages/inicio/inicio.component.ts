import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  constructor() { }
 

  ngOnInit(): void {
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


}
