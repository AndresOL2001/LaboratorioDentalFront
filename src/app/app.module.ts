import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CategoriasService } from './services/categorias.service';
import { ProductoService } from './services/producto.service';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CategoriasService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProductoService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
