import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

 claimsActualUsuario:any;
 rolActualUsuario:any;

  constructor(private usuarioService:UsuarioService,private router:Router){}   

   canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    
     return this.usuarioService.obtenerRolActualUsuario().toPromise().then( resp => {
      let bandera = false;
      let claims;
      if(localStorage.getItem("claims")){
        claims = JSON.parse(localStorage.getItem(("claims")));
      }
      this.rolActualUsuario = claims ? claims[environment.rol] : '';
      
      if(this.rolActualUsuario==='Admin'){
        console.log("Soy admin")
        bandera = true;
      }else if(this.rolActualUsuario==='Usuario'){
        console.log("Soy usuario")
        this.router.navigate(['/inicio/servicios']);
        bandera =  false;
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

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    let bandera = false;
    this.usuarioService.obtenerRolActualUsuario().subscribe(resp => {
      let claims;
      if(localStorage.getItem("claims")){
        claims = JSON.parse(localStorage.getItem(("claims")));
      }
      this.rolActualUsuario = claims ? claims[environment.rol] : ''

      if(this.rolActualUsuario==='Admin'){
        console.log("Soy admin")
        this.router.navigate(['/admin/inicio']); 
        bandera = true;
      }else if(this.rolActualUsuario==='Usuario'){
        console.log("Soy usuario")
        this.router.navigate(['/inicio/servicios']);
        bandera =  false;
      }else{
        this.router.navigate(['/auth/login']);
        bandera =  false;
      }
     })
    
    return bandera;
  }
  
  mapRol(claims){
    return claims!=undefined ? claims[environment.rol] : '';
  }


}
