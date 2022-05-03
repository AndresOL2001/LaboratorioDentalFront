import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,private router:Router){}
  claimsActualUsuario:any;
  rolActualUsuario:any;
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.usuarioService.obtenerRolActualUsuario().toPromise().then( resp => {
     let bandera = false;
     let claims;
     if(localStorage.getItem("claims")){
       claims = JSON.parse(localStorage.getItem(("claims")));
     }
     this.rolActualUsuario = claims ? claims[environment.rol] : '';
     
     if(this.rolActualUsuario==='Admin' || this.rolActualUsuario==='Usuario'){
       console.log("Soy alguien autenticado")
       bandera = true;
     }else{
       console.log("entraste aqui")
       this.router.navigate(['/auth/login']);
       bandera =  false;
     }
     return bandera;
    }).catch( err => {
     this.router.navigate(['/auth/login']);
      //console.log(err);
      return false;
    });
  }
  
}
