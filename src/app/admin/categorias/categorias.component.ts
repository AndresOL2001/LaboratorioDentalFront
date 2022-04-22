import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private categoriasService:CategoriasService) { }

  propiedades = ["ID", "Nombre","Imagen", "Descripcion", "Tipo","Editar", "Eliminar"];
   categorias = [];
  


  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((resp:any)=>{
      this.categorias = resp;
    })
  }

}
