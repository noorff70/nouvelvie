import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-product-landing',
  templateUrl: './product-landing.component.html',
  styleUrls: ['./product-landing.component.css']
})
export class ProductLandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /*
    Withings
  */
  displayWithingsData () {
    this.router.navigate(['/withingdisplay']);
  }

  /*
    Fitbit
  */
  getFitbitAuthorization () {

  }

}
