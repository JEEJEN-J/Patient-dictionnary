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
  username;

  langs: any[] = [];
  lang;
  accounts: any[] = [];


  constructor(public navController: NavController ,
              private db: DbService) {
  }


  ngOnInit(): void {
    // window.location.reload();

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchLangs().subscribe(lng => {
          this.langs = lng;
          if (this.langs.length == 0) {
            this.lang = 'fr';
          } else {
            this.lang = this.langs[0].lang;
          }
          this.initializeItems();
        });
      }
    });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchAccounts().subscribe(acc => {
          this.accounts = acc;
          this.username = this.accounts[0].username;
        });
      }
    });


    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCalculates().subscribe(item => {
          this.Data = item;
        });
      }
    });
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
    console.log('akkkkk : ' , this.accounts.length)
    if (this.accounts.length == 0)
      this.navController.navigateForward(["profil"] , {});
    else if (this.accounts.length == 1)
      this.navController.navigateForward(["edit-profil"] , {});
  }

  initializeItems() {
    console.log('langue : ',this.lang)
    fetch("./assets/i18n/"+this.lang+".json")
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
        this.header = this.items.infos.dash_client.title;
      });
  }


}
