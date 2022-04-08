import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { ServiciosComponent } from './servicios/servicios.component';

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
