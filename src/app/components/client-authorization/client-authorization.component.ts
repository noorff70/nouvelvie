import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { RestservicePointService } from 'src/app/services/restservice-point.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-authorization',
  templateUrl: './client-authorization.component.html',
  styleUrls: ['./client-authorization.component.css']
})
export class ClientAuthorizationComponent implements OnInit {

  public isLoggedIn = false;
  oauthResponse: any;

  constructor(
    private userService: RestservicePointService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
        console.log("COde: " + params.code);
        this.getAccessToken(params.code);
      }
    });
  }

  login() {
    const params = [
      'response_type=code',
      'state=5ca75bd30',
      'client_id=f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8',
      'scope=user.activity',
      'redirect_uri=https://nouvelvie.com/oauth/callback',
      //'redirect_uri=http://localhost:4200/oauth/callback',
    ];

    window.location.href = 'https://account.withings.com/oauth2_user/authorize2?' + params.join('&');

  }

  getAccessToken(code: string) {
    var currentdate = Math.floor(Date.now() / 1000);
    const payload = new HttpParams()
        .append('grant_type', 'authorization_code')
        .append('action', 'requesttoken')
        .append('code', code)
        .append('nonce', currentdate.toString())
        .append('signature', 'faizulnoor')
        .append('redirect_uri', 'https://nouvelvie.com/oauth/callback')
       // .append('redirect_uri', 'http://localhost:4200/oauth/callback')
        .append('client_secret', '51a4b862ffdf96bb4b2390d673e9f85e695d723e8b6d641f22c702ed8f5854cf')
        .append('client_id', 'f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8');
    
        this.http.post('https://wbsapi.withings.net/v2/oauth2', payload, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).subscribe(response => {
        this.oauthResponse = response;
        console.log("Response Token: " + JSON.stringify(this.oauthResponse));
    });
}

}
