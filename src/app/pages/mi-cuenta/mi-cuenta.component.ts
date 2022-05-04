import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  constructor() { }

  nombre: string;
  claims: any;
  ngOnInit(): void {
    this.inicializarPermisos();
  }

  inicializarPermisos() {

    if (localStorage.getItem("claims")) {
      this.claims = JSON.parse(localStorage.getItem(("claims")));
    }
    this.nombre = this.claims ? this.claims[environment.nombre] : '';



  }

}
