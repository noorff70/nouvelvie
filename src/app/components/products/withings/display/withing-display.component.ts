import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/helper/communication.service';

@Component({
  selector: 'app-display-client',
  templateUrl: './display-client.component.html',
  styleUrls: ['./display-client.component.css']
})
export class WithingDisplayComponent implements OnInit {

  withingJSONMsg: any;
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
    private comService: CommunicationService,
    private http: HttpClient
  ) { 
    this.withingJSONMsg = this.comService.withingJSON$.subscribe(json => {
      console.log("Display Msg" + json);
      this.withingJSONMsg = json;
    });
  }

  ngOnInit() {
    this.display();
  }

  display () {
    this.getActivity();
  }

    /*
    Get the user activity
    use token
  */
    getActivity() {
      const payload = new HttpParams()
      .append('action', 'getactivity')
      .append('startdateymd', '2022-01-01')
      .append('enddateymd', '2022-01-20')
      .append("access_token", localStorage.getItem("access_token"))
      //.append('access_token', token)
  
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
    }

}
