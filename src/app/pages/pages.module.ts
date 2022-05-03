import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductoComponent } from './producto/producto.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { HistorialComponent } from './historial/historial.component';
import { ComprasComponent } from './compras/compras.component';
import { UsuarioConfigComponent } from './usuario-config/usuario-config.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InicioComponent,
    LoadingComponent,
     ServiciosComponent, 
     CategoriasComponent,
      ProductoComponent, 
      MiCuentaComponent,
       HistorialComponent, 
       ComprasComponent, 
       UsuarioConfigComponent,
       
      ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
