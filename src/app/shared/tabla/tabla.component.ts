import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProductoService } from '../../services/producto.service';
import { WatchService } from 'src/app/services/watch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  constructor(private watchService: WatchService,
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private categoriaService: CategoriasService) { }

  @Input() datos: any[] = [];
  @Input() propiedades: [] = [];
  @Input() modelo: string = '';
  modalSwitch: boolean = false;

  ngOnInit(): void {
    this.watchService.$modal.subscribe((valor) => (this.modalSwitch = valor));
  }

  openModal() {
    this.modalSwitch = true;
  }

  eliminarModelo(id: number) {
    switch (this.modelo) {
      case ("Categorias"):
        Swal.fire({
          title: 'Estas seguro que deseas eliminar esta categoria?',
          showDenyButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
          icon:'question'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.categoriaService.eliminarCategoriaById(id).subscribe(resp => {
              Swal.fire('Exito!', 'La categoria fue borrada correctamente', 'success')
            });
        
          } else if (result.isDenied) {
            Swal.fire('Exito!', 'Sin cambios', 'info')
          }
        })
        break;
      case ("Usuarios"):
        Swal.fire({
          title: 'Estas seguro que deseas eliminar este usuario?',
          showDenyButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
          icon:'question'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.usuarioService.eliminarUsuarioById(id).subscribe(resp => {
              Swal.fire('Exito!', 'El usuario fue borrado correctamente', 'success')
            });
        
          } else if (result.isDenied) {
            Swal.fire('Exito!', 'Sin cambios', 'info')
          }
        })
        break;
      case ("Productos"):
        Swal.fire({
          title: 'Estas seguro que deseas eliminar este producto?',
          showDenyButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
          icon:'question'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.productoService.eliminarProductoById(id).subscribe(resp => {
              Swal.fire('Exito!', 'El producto fue borrado correctamente', 'success')
            });
        
          } else if (result.isDenied) {
            Swal.fire('Exito!', 'Sin cambios', 'info')
          }
        })
        break;
      default:
        console.log("error");
        break;
    }
  }
}
