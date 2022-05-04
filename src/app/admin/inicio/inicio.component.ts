import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private categoriasService:CategoriasService) { }
 
  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.categoriasService.getCategorias().subscribe(resp => {
      console.log(resp);
    });
  }
  
  cerrarSesion(){
    localStorage.removeItem('claims');
  }

}
