import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WatchService } from 'src/app/services/watch.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoCreacion } from '../../models/Producto';
import { UsuarioCreacion } from '../../models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaCreacion } from '../../models/categoria';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {


  creacionForm: FormGroup;
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  rfcPattern: string = '^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$'

  @Input() modeloNombre: string = '';
  @Input() editar:boolean;
  @Input() modeloId:number;
  modeloModal:any;

  @Output()
  propagar = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private modalS: WatchService,
    private authService: AuthService,
    private usuarioService:UsuarioService,
    private categoriasService: CategoriasService,
    private productoService: ProductoService) {

    this.creacionForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(10)]], //
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      Celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Direccion: ['', [Validators.required, Validators.maxLength(50)]],
      CodigoPostal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      RFC: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(this.rfcPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      imagen: ['', [Validators.required]], //
      descripcion: ['', [Validators.required]],//
      tipo: ['', Validators.required],//
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      categoriaId: ['', Validators.required]
    }, {
      validators: [this.samePasswords()]
    })

  }
 

  samePasswords() {
    return (formGroup: FormGroup) => {
      const password1 = formGroup.controls['password'];
      const password2 = formGroup.controls['confirmPassword'];
      if (password1.value === password2.value) {
        password2.setErrors(null);
      } else {
        password2.setErrors({ noEsIgual: true });
      }

    }
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.creacionForm.patchValue({

        imagen: file

      });

      let leer_img = new FileReader();
      let id_img:any = document.getElementById('img-foto');
      leer_img.onload = ()=>{
        if(leer_img.readyState == 2){
          id_img.src = leer_img.result;
          id_img.style.display="inline";
        }     
       }
    
      leer_img.readAsDataURL(event.target.files[0]);
    }

  }

  crearModelo(modeloNombre: string) {
  
    this.deshabilitarControlesNoUsados();

    if (this.creacionForm.invalid) {
      this.creacionForm.markAllAsTouched();

      console.log("formulario invalido")


    } else {
      console.log("formulario valido");
     // console.log(this.creacionForm.value);
      if (modeloNombre === 'Categorias') {
        let categoriaCreacionDTO:CategoriaCreacion = {
          Nombre:this.creacionForm.controls['Nombre'].value,
          Descripcion:this.creacionForm.controls['descripcion'].value,
          Tipo:this.creacionForm.controls['tipo'].value,
          Imagen:this.creacionForm.controls['imagen'].value,
      
        }

        if(this.editar){
          this.categoriasService.updateCategoriaById(this.modeloId,categoriaCreacionDTO).subscribe(resp => {
            Swal.fire('Correcto','Categoria Actualizada correctamente','success');
           
            this.propagar.emit("actualiza");

            this.closemodal()
    
          });
        }else{
          this.categoriasService.crearCategoria(categoriaCreacionDTO).subscribe(resp => {
            Swal.fire('Correcto','Categoria creada correctamente','success');
           
            this.propagar.emit("actualiza");

            this.closemodal()
    
          });
        }
      
      } else if (modeloNombre === 'Usuarios') {
        let usuarioAux:UsuarioCreacion = this.creacionForm.value;

        if(this.editar){
          this.usuarioService.updateUsuarioById(this.modeloId,usuarioAux).subscribe(resp => {
            Swal.fire('Correcto','Usuario Actualizado correctamente','success');
           
            this.propagar.emit("actualiza");

            this.closemodal()
    
          });

        }else{

          this.authService.crearUsuario(usuarioAux).subscribe(resp => {
            Swal.fire('Correcto','Usuario creado correctamente','success');
            this.propagar.emit("actualiza");
            this.closemodal()
          });

        }
        
      } else if (modeloNombre === 'Productos') {
       let categoriaIds = 
       Array.from(this.creacionForm.controls['categoriaId'].value)
       .filter(x=> x!=',')
       .map( (x:string) => parseInt(x));
        
       console.log(categoriaIds);

        let productoCreacionDTO:ProductoCreacion = {
          ProductoNombre:this.creacionForm.controls['Nombre'].value,
          Descripcion:this.creacionForm.controls['descripcion'].value,
          precio:this.creacionForm.controls['precio'].value,
          imagen:this.creacionForm.controls['imagen'].value,
          categoriaProductosIds:categoriaIds,
          CantidadEnStock:this.creacionForm.controls['cantidad'].value,

        }
        console.log(productoCreacionDTO);

        if(this.editar){

          this.productoService.updateProductoById(this.modeloId,productoCreacionDTO).subscribe(resp => {
            Swal.fire('Correcto','Producto Actualizado correctamente','success');
           
            this.propagar.emit("actualiza");
            this.closemodal()
          });

        }else{

          this.productoService.crearProducto(productoCreacionDTO).subscribe(resp => {
            Swal.fire('Correcto','Producto creado correctamente','success');
            this.propagar.emit("actualiza");
            this.closemodal()
          });

        }
      

      } else {
        Swal.fire('Incorrecto','Modelo no encontrado','error');
      }

    }

  }

  ngOnInit(): void {
    console.log(this.editar);
    if(this.modeloId){
      this.buscarModeloById(this.modeloId);
    }
  

  }

  closemodal() {
    this.modalS.$modal.emit(false);
  }

  errorMsg(mensaje: string) {
    return mensaje;
  }
  //Validamos los campos del formulario
  campoEsValido(campo: string) {
    var error = this.creacionForm.controls[campo].errors && this.creacionForm.controls[campo].touched;  
  
    return error;
  }

  actualizarTablas() {
    switch (this.modeloNombre) {
      case "Categorias":
        this.categoriasService.getCategorias().subscribe( (resp:any) => {
         // this.datos=resp;
        })
        break;
      case "Usuarios":
        this.usuarioService.obtenerUsuarios().subscribe( (resp:any) => {
         // this.datos=resp;
        })
        break;
      case "Productos":
        this.productoService.getProductos().subscribe( (resp:any) => {
        //  this.datos=resp;
        })
        break;
      default:
        break;
    }
  }
 deshabilitarControlesNoUsados() {

  if (this.modeloNombre === 'Categorias') {
   
    this.desactivarUsuariosForm();
    this.desactivarProductosForm();

  } else if (this.modeloNombre === 'Usuarios') {
    this.desactivarProductosForm();
    this.desactivarCategoriasForm();
    this.creacionForm.controls.imagen.disable();

  } else if (this.modeloNombre === 'Productos') {
    this.desactivarUsuariosForm();
    this.desactivarCategoriasForm();
  } else {
    console.log("error");
  }
}
desactivarCategoriasForm(){
  this.creacionForm.controls.descripcion.disable();
  this.creacionForm.controls.tipo.disable();
}
desactivarUsuariosForm(){
  this.creacionForm.controls.correo.disable();
  this.creacionForm.controls.Celular.disable();
  this.creacionForm.controls.Direccion.disable();
  this.creacionForm.controls.CodigoPostal.disable();
  this.creacionForm.controls.RFC.disable();
  this.creacionForm.controls.password.disable();
  this.creacionForm.controls.confirmPassword.disable();
}

desactivarProductosForm(){
  this.creacionForm.controls.cantidad.disable();
  this.creacionForm.controls.precio.disable();
  this.creacionForm.controls.categoriaId.disable();
}

buscarModeloById(id:number){
  switch (this.modeloNombre) {
    case ("Categorias"):
      
          this.categoriasService.getCategoriaById(id).subscribe(resp => {
          this.modeloModal=resp;
          console.log(this.modeloModal);
          this.setFormValues();
          });
        
      break;
    case ("Usuarios"):
    
      this.usuarioService.obtenerUsuarioById(id).subscribe(resp => {
        this.modeloModal=resp;
        console.log(this.modeloModal);
        this.setFormValues();
      });
       
      break;
    case ("Productos"):
      this.productoService.getProductoById(id).subscribe(resp => {
        this.modeloModal=resp;
        console.log(this.modeloModal);
        this.setFormValues();
      });
  
      break;
    default:
      console.log("error");
      break;
  }
}
  
setFormValues(){
 
  this.creacionForm.controls.Nombre.setValue(this.modeloModal?.nombre || this.modeloModal?.productoNombre);
  this.creacionForm.controls.correo.setValue(this.modeloModal?.correo);
  this.creacionForm.controls.Celular.setValue(this.modeloModal?.celular);
  this.creacionForm.controls.Direccion.setValue(this.modeloModal?.direccion);
  this.creacionForm.controls.CodigoPostal.setValue(this.modeloModal?.codigoPostal);
  this.creacionForm.controls.RFC.setValue(this.modeloModal?.rfc);
  this.creacionForm.controls.descripcion.setValue(this.modeloModal?.descripcion);
  this.creacionForm.controls.tipo.setValue(this.modeloModal?.tipo);
  this.creacionForm.controls.cantidad.setValue(this.modeloModal?.cantidadEnStock);
  this.creacionForm.controls.precio.setValue(this.modeloModal?.precio);

  let categorias=[];
  this.modeloModal?.categorias?.forEach(categoria => {
    categorias.push(categoria.id);
  });
 this.creacionForm.controls.categoriaId.setValue(categorias.toString());


}
}

