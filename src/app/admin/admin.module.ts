import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { TablaComponent } from '../shared/tabla/tabla.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { ModalComponent } from '../shared/modal/modal.component';


@NgModule({
  declarations: [InicioComponent, TablaComponent, CategoriasComponent, UsuariosComponent, ProductosComponent,ModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
