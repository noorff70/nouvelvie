import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientAuthorizationComponent } from './components/client-authorization/client-authorization.component';
import { EncrDecrService } from './services/encr-decr-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientAuthorizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EncrDecrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
