import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductLandingComponent } from './components/products/product-landing/product-landing.component';
import { WithingClientAuthorizationComponent } from './components/products/withings/authorization/withing-client-authorization.component';
import { WithingDisplayComponent } from './components/products/withings/display/withing-display.component';


const routes: Routes = [
  /* default */
  { path: '', redirectTo: '/nouvelvie', pathMatch: 'full' },
  { path: 'nouvelvie', component: ProductLandingComponent},
 // { path: 'nouvelvie', component: ClientAuthorizationComponent},
  { path: 'withingauthorization', component: WithingClientAuthorizationComponent }, // withingauthorization page
  { path: 'oauth/callback', component: WithingClientAuthorizationComponent },
  { path: 'withingdisplay', component: WithingDisplayComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
