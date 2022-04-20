import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL_API = environment.urlLocal;
  private PRODUCCION = 'https://depositodentalapi.herokuapp.com/api/'
  public claims:{};

  get getClaims(){
    return this.claims;
  }
  constructor(private http:HttpClient) { }
  obtenerRolActualUsuario(){

    return this.http.get(this.PRODUCCION+'Usuarios/rolUsuario');
  }

  
}
