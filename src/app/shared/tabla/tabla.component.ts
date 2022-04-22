import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProductoService } from '../../services/producto.service';
import { WatchService } from 'src/app/services/watch.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {



  constructor(private watchService:WatchService) {  }

  @Input() datos:any[]=[];
  @Input() propiedades:[]=[];
  @Input() modelo:string = '';
modalSwitch:boolean = false;

  ngOnInit(): void {
    this.watchService.$modal.subscribe((valor) => (this.modalSwitch = valor));
  }

  openModal(){

    this.modalSwitch = true;
  }



}

