import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

 
  constructor(private productosService:ProductoService) { }
  
  propiedades = ["ID","imagen", "Descripcion", "nombre","Precio","Editar", "Eliminar"];
   productos = [];
  


  ngOnInit(): void {
    this.productosService.getProductos().subscribe((resp:any)=>{
      this.productos = resp;
     // console.log(resp);
    })
  }
}
