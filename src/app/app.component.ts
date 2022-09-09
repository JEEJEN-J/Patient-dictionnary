import { Component } from '@angular/core';
import {EmbedVideoService} from "ngx-embed-video";
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  clickSub: any;

  constructor(private localNotifications: LocalNotifications) {
    this.simpleNotif()
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
