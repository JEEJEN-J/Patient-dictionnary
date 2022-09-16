import {Component , OnInit} from '@angular/core';
import {NavController , NavParams} from "@ionic/angular";
import {DbService} from "../services/db.service";


@Component({
  selector: 'app-home' ,
  templateUrl: 'home.page.html' ,
  styleUrls: ['home.page.scss'] ,
})
export class HomePage implements OnInit {

  items;
  Data: any[] = [];

  simple;
  AppTitle;
  app;
  bienvenu;
  next;
  precd;
  start;
  client;
  parent;
  settings;
  languages;
  header;

  constructor(public navController: NavController ,
              private db: DbService) {
  }

  openPage() {
    this.navController.navigateForward(["dashboard"] , {queryParams: {title: this.header}});
    // this.db.addAccount('Patient', new Date());
  }


  openParentPage() {
    this.navController.navigateForward(["dash-parent"] , {queryParams: {title: this.header}});
    // this.db.addAccount('Parent Patient', new Date());
  }


  openLagues() {
    this.navController.navigateForward(["lagues"] , {queryParams: {title: 'FR'}});
  }


  openProfil() {
    this.navController.navigateForward(["profil"] , {});
  }

  initializeItems() {
    fetch("./assets/i18n/cr.json")
      .then((response) => response.json())
      .then((response) => {
        this.items = response[0];
        console.log("response home : " , response);
        this.simple = this.items.infos.home.SimpleText;
        this.AppTitle = this.items.infos.home.AppTitle;
        this.app = this.items.infos.home.app;
        this.bienvenu = this.items.infos.home.bienvenu;
        this.next = this.items.infos.home.next;
        this.precd = this.items.infos.home.precd;
        this.start = this.items.infos.home.start;
        this.client = this.items.infos.home.client;
        this.parent = this.items.infos.home.parent;
        this.languages = this.items.infos.home.languages;
        this.settings = this.items.infos.home.settings;

        this.header = 'Dashboard Pasyan';
      });
  }


  ngOnInit(): void {

    this.initializeItems();

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
