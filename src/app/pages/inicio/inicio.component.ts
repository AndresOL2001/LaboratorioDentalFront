import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
  }

  abrirMenu(){

  const menu_items = document.querySelector('.menu_items')
  menu_items.classList.toggle('show')
    
  }

}
