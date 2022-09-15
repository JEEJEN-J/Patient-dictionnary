import {Component , OnInit} from '@angular/core';
import {NavController , NavParams} from "@ionic/angular";
import {DbService} from "../services/db.service";


@Component({
  selector: 'app-home' ,
  templateUrl: 'home.page.html' ,
  styleUrls: ['home.page.scss'] ,
})
export class HomePage implements OnInit {

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  Data: any[] = [];

  constructor(public navController: NavController ,
              private db: DbService) {
  }

  openPage() {
    this.navController.navigateForward(["dashboard"] , {queryParams: {title: 'Dashboard patient'}});
    this.db.addAccount('Patient', new Date());
  }


  openParentPage() {
    this.navController.navigateForward(["dash-parent"] , {queryParams: {title: 'Dashboard Parent patient'}});
    this.db.addAccount('Parent Patient', new Date());
  }


  openLagues() {
    this.navController.navigateForward(["lagues"] , {queryParams: {title: 'FR'}});
  }


  openProfil() {
    this.navController.navigateForward(["profil"] , {});
  }


  ngOnInit(): void {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCalculates().subscribe(item => {
          this.Data = item;
        });
      }
    });
    console.log("Account : ", this.Data.length)
  }


}
