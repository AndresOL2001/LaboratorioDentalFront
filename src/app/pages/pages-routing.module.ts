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
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserGuard } from '../auth/guards/user.guard';

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
        path:'miCuenta',component:MiCuentaComponent,
        canActivate:[UserGuard]        
      },
      {
        path:'miCuenta/compras',component:ComprasComponent,
        canActivate:[UserGuard]        
      },
      {
        path:'miCuenta/historial',component:HistorialComponent,
        canActivate:[UserGuard]        
      },
      {
        path:'miCuenta/configuracion',component:UsuarioConfigComponent,
        canActivate:[UserGuard],
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
