import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioCreacion } from '../../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-config',
  templateUrl: './usuario-config.component.html',
  styleUrls: ['./usuario-config.component.css']
})
export class UsuarioConfigComponent implements OnInit {
  private id:string;
  claims:any;
  usuario:any;
  actualizarForm:FormGroup;
  emailPattern:string='^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  rfcPattern:string='^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$'

  constructor(private usuarioService:UsuarioService,private fb:FormBuilder) {
    
    this.actualizarForm = this.fb.group({
      Nombre:['',[Validators.required,Validators.minLength(10)]],
      Correo:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      Celular:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      Direccion:['',[Validators.required,Validators.maxLength(50)]],
      CodigoPostal:['',[Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
      RFC:['',[Validators.required,Validators.minLength(13),Validators.maxLength(13),Validators.pattern(this.rfcPattern)]],
      passwordActual:['',[Validators.required,Validators.minLength(6)]],
      password:['',[Validators.required,Validators.minLength(6)]]

    })
  }

  ngOnInit(): void {
    this.id = this.obtenerIdUsuarioActual();
     this.usuarioService.obtenerUsuarioById(Number(this.id)).subscribe(resp => {
      this.usuario = resp;
      this.setFormValues();
    });

    }

    setFormValues(){
 
      this.actualizarForm.controls.Nombre.setValue(this.usuario?.nombre );
      this.actualizarForm.controls.Correo.setValue(this.usuario?.correo);
      this.actualizarForm.controls.Celular.setValue(this.usuario?.celular);
      this.actualizarForm.controls.Direccion.setValue(this.usuario?.direccion);
      this.actualizarForm.controls.CodigoPostal.setValue(this.usuario?.codigoPostal);
      this.actualizarForm.controls.RFC.setValue(this.usuario?.rfc);
    
    
    }

    obtenerIdUsuarioActual(){
      if(localStorage.getItem("claims")){
        this.claims = JSON.parse(localStorage.getItem(("claims")));
      }
     return this.claims ? this.claims[environment.id] : '';
    }

    actualizarUsuario(){
      if(this.actualizarForm.invalid){
        console.log(this.actualizarForm.value);
        console.log("formulario invalido");
        this.actualizarForm.markAllAsTouched();
        
  
      }else{
       
      
       let password = this.actualizarForm.controls['passwordActual'].value;
  
        this.usuarioService.checkPasswordsById(password).subscribe(resp => {
          let usuarioActualizar:UsuarioCreacion = this.actualizarForm.value;
          this.usuarioService.updateUsuarioById(Number(this.id),usuarioActualizar).subscribe(resp => {
              Swal.fire('Correcto','Los datos han sido actualizados','success');
          })
        },err => {
          Swal.fire('Incorrecto','Tu contraseña actual no es correcta','error');

        });
  
      }    
    }
    //Validamos los campos del formulario
   campoEsValido(campo:string){
    return this.actualizarForm.controls[campo].errors && this.actualizarForm.controls[campo].touched;
  }

  errorMsg(mensaje:string){  
    return mensaje;
}
}
