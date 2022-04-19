import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

 claimsActualUsuario:any;
 rolActualUsuario:any;

  constructor(private usuarioService:UsuarioService,private router:Router){
  
  }   
  //Guards generados para la proteccion de las rutas de usuarios no logeados 

   inicializarGuard(){
    this.claimsActualUsuario = this.usuarioService.getClaims;
    this.rolActualUsuario = this.mapRol(this.claimsActualUsuario);
   }

   canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.inicializarGuard();
    
    if(this.rolActualUsuario==='Admin'){
      console.log("Soy admin")
      return true;
    }else if(this.rolActualUsuario==='Usuario'){
      console.log("Soy usuario")
      return true;
    }else{
      this.router.navigate(['/auth/login']);
      return false;
    }

  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {

    
    if(this.rolActualUsuario==='Admin'){
      console.log("Soy admin")
      return true;
    }else if(this.rolActualUsuario==='Usuario'){
      console.log("Soy usuario")
      return true;
    }else{
      this.router.navigate(['/auth/login']);
      return false;
    }

  }
  
  mapRol(claims){
    return claims!=undefined ? claims[environment.rol] : '';
  }


}
