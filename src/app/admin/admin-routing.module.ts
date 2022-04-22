import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [

  {
    path:'',
    children:[
      {
        path:'inicio',component:InicioComponent
      },
      {
        path:'categorias',component:CategoriasComponent
      },
      {
        path:'usuarios',component:UsuariosComponent
      },
      {
        path:'productos',component:ProductosComponent
      },
     
    ]
    
  }   

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
