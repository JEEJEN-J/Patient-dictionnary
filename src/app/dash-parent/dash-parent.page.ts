import {Component , OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../services/db.service";

@Component({
  selector: 'app-dash-parent' ,
  templateUrl: './dash-parent.page.html' ,
  styleUrls: ['./dash-parent.page.scss'] ,
})
export class DashParentPage implements OnInit {

  items;
  don = [];
  data;
  cp: number = 1;
  panelOpenState = false;
  title;

  itemsInfos;
  langs: any[] = [];
  lang;
  header;

  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              private db: DbService) {
    this.initializeItems();
  }


  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.title = params;
    });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchLangs().subscribe(lng => {
          this.langs = lng;
          if (this.langs.length == 0) {
            this.lang = 'fr';
          } else {
            this.lang = this.langs[0].lang;
          }
        });
      }
    });

    fetch("./assets/i18n/" + this.lang + "p.json")
      .then((response) => response.json())
      .then((response) => {
        this.items = response;
        this.itemsInfos = response[0];
        this.header = this.itemsInfos.header;
      });
  }


  initializeItems() {
    fetch("./assets/i18n/" + this.lang + "p.json")
      .then((response) => response.json())
      .then((response) => {
        this.data = response;
      });
    this.items = this.data;

  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(item.toLowerCase().toString())
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  openPage(header , item: any) {
    this.navController.navigateForward("definition-parent" , {
      queryParams: {
        header: header ,
        data: item
      }
    });
  }

  goBack() {
    this.navController.navigateBack("home" , {});
  }

}
