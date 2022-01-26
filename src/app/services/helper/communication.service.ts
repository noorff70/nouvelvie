import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }

  withingJSON = new Subject<any>();
  withingJSON$ = this.withingJSON.asObservable();

  displayWithingJSON(message: any) {
    this.withingJSON.next(message)
  }

}
