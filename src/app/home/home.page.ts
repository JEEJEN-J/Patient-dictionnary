import {Component} from '@angular/core';
import {NavController , NavParams} from "@ionic/angular";


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
    this.navController.navigateForward(["dash-parent"] , {queryParams: {title: 'Dashboard Parent patient'}});
  }


}
