import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductoComponent } from './producto/producto.component';
import { LoadingComponent } from '../shared/loading/loading.component';


@NgModule({
  declarations: [InicioComponent,LoadingComponent, ServiciosComponent, CategoriasComponent, ProductoComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
