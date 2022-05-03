import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioCreacion } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm:FormGroup;
  emailPattern:string='^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  rfcPattern:string='^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$'

  msgCelular = "Formato invalido el valor tiene que ser igual a 10 numeros"
   //Metodo para simplificar los mensajes de error

   errorMsg(mensaje:string){  
    return mensaje;
  }


  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { 
    this.registroForm = this.fb.group({
      Nombre:['',[Validators.required,Validators.minLength(10)]],
      Correo:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      Celular:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      Direccion:['',[Validators.required,Validators.maxLength(50)]],
      CodigoPostal:['',[Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
      RFC:['',[Validators.required,Validators.minLength(13),Validators.maxLength(13),Validators.pattern(this.rfcPattern)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]]

    } ,{
      validators:[this.samePasswords()]
    })
  }

  ngOnInit(): void {
  }

  registro(){
    if(this.registroForm.invalid){
      console.log(this.registroForm.value);
      console.log("formulario invalido");
      this.registroForm.markAllAsTouched();
      

    }else{
      console.log("formulario valido");
      let usuarioAux:UsuarioCreacion = this.registroForm.value;

      this.authService.crearUsuario(usuarioAux).subscribe(resp => {
        Swal.fire('Correcto','Usuario creado correctamente','success');
        this.router.navigate(['/auth/login']);
      });

    }
  }

   //Validamos los campos del formulario
   campoEsValido(campo:string){
    return this.registroForm.controls[campo].errors && this.registroForm.controls[campo].touched;
  }

  samePasswords(){
    return (formGroup:FormGroup) => {
      const password1 = formGroup.controls['password'];
      const password2 = formGroup.controls['confirmPassword'];
      if(password1.value === password2.value){
        password2.setErrors(null);
      }else{
        password2.setErrors({noEsIgual:true});
      }

    }
  }

}
