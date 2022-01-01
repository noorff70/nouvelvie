import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestservicePointService {

  private SERVER_URL = 'https://account.withings.com/oauth2_user/authorize2';
  
  constructor(private httpClient: HttpClient) { 

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public get() {

    const params = new HttpParams()
    .set('client_id', 'f37e5ad6fc648d5e1d8d338bad8fba3c9c73d7e766ed8207c95f6e7b484fd3d8')
    .set('response_type', 'code')
    .set('state', '5ca75bd30')
    .set('redirect_uri', 'https://nouvelvie.com')
    .set('scope', 'user.activity');

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    this.httpClient.get('account.withings.com/oauth2_user/authorize2', {headers, params}); 
    //this.httpClient.get('account.withings.com/oauth2_user/authorize2', {headers, params}); 
    
    return this.httpClient.get(this.SERVER_URL, {params})
    .pipe(catchError(
      this.handleError)
    );
  }

}
