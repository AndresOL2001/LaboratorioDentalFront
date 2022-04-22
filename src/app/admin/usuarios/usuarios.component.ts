import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  propiedades = ["Id", "Nombre","Celular", "Direccion", "Codigo Postal","Correo", "Rfc"];
   usuarios = [];
  
   constructor(private usuarioService:UsuarioService){}


  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((resp:any)=>{
      this.usuarios = resp;
    })
  }
}
