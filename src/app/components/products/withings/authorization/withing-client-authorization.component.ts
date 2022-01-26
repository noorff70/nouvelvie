import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { RestservicePointService } from 'src/app/services/restservice-point.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CommunicationService } from 'src/app/services/helper/communication.service';

@Component({
  selector: 'app-client-authorization',
  templateUrl: './client-authorization.component.html',
  styleUrls: ['./client-authorization.component.css'],
  providers: [CommunicationService]
})
export class WithingClientAuthorizationComponent implements OnInit {

  public isLoggedIn = false;
  oauthResponse: any;
  nonceResponse: any;
  useractivatenonce: any;
  nonce: string;
  code: string;
  timestamp: string
  client_id : string = 'f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8';
  client_secret: string = '51a4b862ffdf96bb4b2390d673e9f85e695d723e8b6d641f22c702ed8f5854cf';
  nonceSignature: string;
  JSONData: string;

  constructor(
    private userService: RestservicePointService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private comService: CommunicationService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
        this.code = params.code;
        localStorage.setItem("code", this.code);
        console.log("ngOnInit: " + "Authorized code: " + this.code);
        this.getNonceForAccessToken();
      }
    });
  }

  /*
    this is for getting authorization
    returns a code
    use this code to get nonce
  */
  getData() {
    const params = [
      'response_type=code',
      'state=5ca75bd30',
      'client_id=f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8',
      'scope=user.info,user.metrics,user.activity',
      //'redirect_uri=https://nouvelvie.com/oauth/callback',
      'redirect_uri=http://localhost:4200/oauth/callback',
    ];

    window.location.href = 'https://account.withings.com/oauth2_user/authorize2?' + params.join('&');

  }

  /*
    Make a post request to withings for nonce
  */
  getNonceForAccessToken() {
    var currentdate = Math.floor(Date.now() / 1000);
    this.timestamp = currentdate.toString();

    const key = this.client_secret;
    var hashvalue = 'getnonce' + ',' + this.client_id + ',' + this.timestamp;
    
    const hashedPass = CryptoJS.HmacSHA256(hashvalue, key);
    this.nonceSignature = hashedPass.toString();


    const payload = new HttpParams()
      .append('action', 'getnonce')
      .append('client_id', 'f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8')
      .append('timestamp', currentdate.toString())
      .append('signature', this.nonceSignature);

      this.http.post('https://wbsapi.withings.net/v2/signature', payload
      ).subscribe(response => {
        this.nonceResponse = response;
        this.nonce = JSON.stringify(this.nonceResponse.body.nonce);
        console.log("getNonce: " + "nonce: " + this.nonce);
          // get access token
        this.getAccessToken();
        //activate user
      });

     // this.http.post('https://wbsapi.withings.net/v2/signature', payload)
      
  }

  /*
  Get the access token from Withings Server
  */
  getAccessToken() {
    
    // generate a new hash with action + client_id + nonce returned
    let tokenstring = "requesttoken" + "," + this.client_id + "," + this.nonce;
    const hashedPass = CryptoJS.HmacSHA256(tokenstring, this.client_secret);
    

    const payload = new HttpParams()
        .append('action', 'requesttoken')
        .append('grant_type', 'authorization_code')
        .append('client_id', 'f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8')
        .append('client_secret', '51a4b862ffdf96bb4b2390d673e9f85e695d723e8b6d641f22c702ed8f5854cf')
        .append('code', this.code)
        //.append('nonce', this.nonce)
        //.append('signature', hashedPass.toString())
        //.append('redirect_uri', 'https://nouvelvie.com/oauth/callback')
        .append('redirect_uri', 'http://localhost:4200/oauth/callback');

        this.http.post('https://wbsapi.withings.net/v2/oauth2', payload)
        .subscribe(response => {
          let token: any = response;
         
          console.log("Response Token: " + JSON.stringify(token));
          //this.getActivity(token.body.access_token); // this is working
          localStorage.setItem("access_token", token.body.access_token);
          //this.getUserByemail(token.body.access_token);
          //this.linkDevice(token.body.access_token);
          //this.getDevice(token.body.access_token); // this is working
      });
  }

  /* API: User v2 - Activate
  Activates a user
  */
  activateUser() {

    var currentdate = Math.floor(Date.now() / 1000);
    this.timestamp = currentdate.toString();

    const key = this.client_secret;
    var hashvalue = 'getnonce' + ',' + this.client_id + ',' + this.timestamp;
    
    const hashedPass = CryptoJS.HmacSHA256(hashvalue, key);
    let activateUserSignature = hashedPass.toString();


    const noncepayload = new HttpParams()
      .append('action', 'getnonce')
      .append('client_id', 'f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8')
      .append('timestamp', currentdate.toString())
      .append('signature', activateUserSignature);

      this.http.post('https://wbsapi.withings.net/v2/signature', noncepayload)
      .subscribe(response => {
        this.useractivatenonce = JSON.stringify(this.nonceResponse.body.nonce);
        console.log("useractivate nonce: " + this.useractivatenonce);
        var birthdate = new Date(Date.UTC(1970,9,19)).getTime()/1000;
        
        const payload = new HttpParams()
        .append('action', 'activate')
        .append('client_id', this.client_id)
        .append('nonce', this.useractivatenonce)
        .append('signature', activateUserSignature)
        .append('mailingpref', '1')
        .append('birthdate', birthdate.toString())
        .append('measures', '[{"value": 180,"unit": -2,"type": 4},{"value": 8000,"unit": -2,"type": 1}]')
        .append('gender', '0')
        .append('preflang', 'en_EN')
        .append('unit_pref', '{"weight":1,"height":7,"distance":6,"temperature":11}')
        .append('email', 'noorfaizulca@gmail.com')
        .append('timezone', 'America/New_York')
        .append('external_id', '1')
        .append('mac_addresses', '["00:24:e4:c0:91:39"," 00:24:e4:c0:91:39"]')
        .append('firstname', 'Faizul')
        .append('lastname', 'noor')
        .append('shortname', 'FFN')
        .append('phonenumber', '12266064280')
        .append('recovery_code', '123')
        .append('goals', '{"steps": 10000, "sleep": 28800, "weight": { "value": 70500, "unit": -3 } }')

        this.http.post ('https://wbsapi.withings.net/v2/user', payload)
          .subscribe(response => {
            let res = response;
            console.log("Response Token: " + JSON.stringify(res));
        });
      });

  }

  /*
    Get the user activity
    use token
  */
  /*getActivity(token: any) {
    const payload = new HttpParams()
    .append('action', 'getactivity')
    .append('startdateymd', '2022-01-01')
    .append('enddateymd', '2022-01-20')
    .append('access_token', token)

    this.http.post('https://wbsapi.withings.net/v2/measure', payload, {
      headers: {
        //'Authorization': token 
      }
    })
    .subscribe(response => {
      let res = response;
      this.JSONData = JSON.stringify(res);
      this.comService.displayWithingJSON(JSON.stringify(res));
      //this.router.navigate(['/withingdisplay']);
      console.log("User Activity: " + JSON.stringify(res));
    });
  }*/

  /*
  get user information by email
  */
  getUserByemail(token: any) {
    const payload = new HttpParams()
    .append('action', 'get')
    .append('client_id', this.client_id)
    .append('nonce', this.nonce)
    .append('signature', this.nonceSignature)
    .append('email', 'noorfaizulca@gmailcom')
    .append('access_token', token)

    this.http.post('https://wbsapi.withings.net/v2/user', payload, {
      headers: {
        'Authorization': token
      }
    })
    .subscribe(response => {
      let res = response;
      console.log("Response user by email: " + JSON.stringify(res));
    });
  }

  /*
  Link device API
  */
  linkDevice(token: any) {

    const payload = new HttpParams()
    .append('action', 'link')
    .append('mac_addresses', '["00:24:e4:c0:91:39"," 00:24:e4:c0:91:39"]')
    .append('access_token', token)

    this.http.post('https://wbsapi.withings.net/v2/user', payload, {
      headers: {
        'Authorization': token
      }
    })
    .subscribe(response => {
      let res = response;
      console.log("Link device: " + JSON.stringify(res));
    });

  }

  /*
    Get Device API
  */
  /*getDevice(token: any) {

    const payload = new HttpParams()
    .append('action', 'getdevice')
    .append('access_token', token)

    this.http.post('https://wbsapi.withings.net/v2/user', payload, {
      headers: {
        'Authorization': token
      }
    })
    .subscribe(response => {
      let res = response;
      console.log("List device: " + JSON.stringify(res));
    });

  }*/



}


