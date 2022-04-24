import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[errorMsgAdm]'
})
export class ErrorMsgAdmDirective implements OnInit{

//Directiva creada para personalizar los mensajes de error en el login y el registro

htmlElement:ElementRef<HTMLElement>;

_mensaje="";

@Input() set mensaje(valor:string){
  this._mensaje=valor;
  this.setMensaje();
}

constructor(private el:ElementRef<HTMLElement>) {
  this.htmlElement=el;
}

ngOnInit(): void {
  this.setMensaje();

}

setMensaje():void{
  this.htmlElement.nativeElement.innerText = this._mensaje;
} 

}
