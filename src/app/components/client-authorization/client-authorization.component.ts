import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { RestservicePointService } from 'src/app/services/restservice-point.service';

@Component({
  selector: 'app-client-authorization',
  templateUrl: './client-authorization.component.html',
  styleUrls: ['./client-authorization.component.css']
})
export class ClientAuthorizationComponent implements OnInit {

  constructor(private userService: RestservicePointService) { }

  ngOnInit(): void {
    this.login();
   /* this.userService.get().subscribe((data: any) => {
      console.log('Here is: ' + data);
    });*/
  }

  login() {
    window.location.href = 'https://account.withings.com/oauth2_user/authorize2?client_id=f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8&response_type=string&state=5ca75bd30&redirect_uri=http://localhost&scope=user.activity'
  }

}
