import { Component } from '@angular/core';
import {EmbedVideoService} from "ngx-embed-video";
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {MenuController} from "@ionic/angular";
import {LanguageService} from "./services/language.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  clickSub: any;

  constructor(private localNotifications: LocalNotifications,
              private menu: MenuController,
              // private languageService: LanguageService
  ) {
    // this.languageService.setInitialAppLanguage();
    this.simpleNotif()
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  simpleNotif() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' }
    });
  }

  // constructor(private screenOrientation: ScreenOrientation) {
  //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  //   console.log("orientation : ", this.screenOrientation.type)
  //
  //   // detect orientation changes
  //   this.screenOrientation.onChange().subscribe(
  //     () => {
  //       console.log("Orientation Changed");
  //     }
  //   );
  // }



}
