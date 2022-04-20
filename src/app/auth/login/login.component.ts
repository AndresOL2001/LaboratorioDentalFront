import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 loginForm:FormGroup;
 emailPattern:string='^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
 msgEmail ="Formato de email invalido";

  //Metodo para simplificar los mensajes de error
  errorMsg(mensaje:string){  
      return mensaje;
  }
  
  mensajeEmail():string{

    return this.errorMsg(this.msgEmail);

   }

  constructor
  (
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private usuarioService:UsuarioService
  ) {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
  
  }

  async login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      console.log("formulario invalido");

    }else{
      console.log("formulario valido");
      let loginDTO:Login = {
        email: this.loginForm.controls['email'].value,
        password:this.loginForm.controls['password'].value
        
      }
      
     this.authService.login(loginDTO).subscribe(resp => {

        this.usuarioService.obtenerRolActualUsuario().subscribe(resp => {
         
          if(localStorage.getItem("claims")){
            localStorage.removeItem("claims");
          }
          localStorage.setItem("claims",JSON.stringify(resp));
          this.router.navigateByUrl('/admin/inicio');   
         })
          
      })
    }
     
  }

   //Validamos los campos del formulario
   campoEsValido(campo:string){
    return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched;
  }

  
}
