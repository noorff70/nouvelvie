import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WithingClientAuthorizationComponent } from './components/products/withings/authorization/withing-client-authorization.component';
import { EncrDecrService } from './services/encr-decr-service.service';
import { WithingDisplayComponent } from './components/products/withings/display/withing-display.component';
import { ProductLandingComponent } from './components/products/product-landing/product-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    WithingClientAuthorizationComponent,
    WithingDisplayComponent,
    ProductLandingComponent
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
