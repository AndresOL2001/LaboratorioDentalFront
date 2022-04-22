import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from '../../services/producto.service';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService:ProductoService) { }

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
  }
  getProductoById() {
    this.productoService.getProductoById(this.productoIdActual).subscribe( (resp:Producto) => {
      this.productoActual = resp;
      console.log(this.productoActual);
      this.loading = false;
    })
  
  }

  volverAtras(){
    history.go(-1);
  }

  sha(number:number){
    return sha1(number.toString());
  }
}
