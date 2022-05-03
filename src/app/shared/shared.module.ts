import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ErrorMsgDirective } from './directives/error-msg.directive';



@NgModule({
  declarations: [NavbarComponent, ErrorMsgDirective],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    ErrorMsgDirective
  ]
})
export class SharedModule { }
