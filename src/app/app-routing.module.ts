import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientAuthorizationComponent } from './components/client-authorization/client-authorization.component';


const routes: Routes = [
  /* default */
  { path: '', redirectTo: '/nouvelvie', pathMatch: 'full' },
  { path: 'nouvelvie', component: ClientAuthorizationComponent},
  { path: 'oauth/callback', component: ClientAuthorizationComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
