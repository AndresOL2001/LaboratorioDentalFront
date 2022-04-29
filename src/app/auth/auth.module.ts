import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent,RegistroComponent, ErrorMsgDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    ErrorMsgDirective
  ]

})
export class AuthModule { }
