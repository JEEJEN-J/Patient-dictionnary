import {Component} from '@angular/core';
import {NavController , NavParams} from "@ionic/angular";
import {NavigationExtras} from "@angular/router";


@Component({
  templateUrl: 'navigation-details.html' ,
})
export class NavigationDetailsPage {
  item;

  constructor(params: NavParams) {
    this.item = params.data.item;
  }

}

@Component({
  selector: 'app-home' ,
  templateUrl: 'home.page.html' ,
  styleUrls: ['home.page.scss'] ,
})
export class HomePage {


  constructor(public navController: NavController) {

  }

  openPage() {
    this.navController.navigateForward(["dashboard"] , {queryParams: {title: 'Dashboard patient'}});
  }


  openParentPage() {
    this.navController.navigateForward(["dash-parent"] , {queryParams: {title: 'Parent patient'}});
  }


}
