import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { ProductoComponent } from './producto/producto.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ComprasComponent } from './compras/compras.component';
import { HistorialComponent } from './historial/historial.component';
import { UsuarioConfigComponent } from './usuario-config/usuario-config.component';

const routes: Routes = [

  {
    path:'',
    children:[
      {
        path:'',component:InicioComponent
      },
      {
        path:'servicios',component:ServiciosComponent
      },
      {
        path:'servicios/categorias/:id',component:CategoriasComponent
      },
      {
        path:'servicios/categorias/:id/productos/:id',component:ProductoComponent
      },
      {
        path:'miCuenta',component:MiCuentaComponent
      },
      {
        path:'miCuenta/compras',component:ComprasComponent
      },
      {
        path:'miCuenta/historial',component:HistorialComponent
      },
      {
        path:'miCuenta/configuracion',component:UsuarioConfigComponent
      },
      {
        path:'**',redirectTo:''
      }
    ]
    
  }   
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
