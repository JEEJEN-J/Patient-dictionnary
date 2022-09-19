import {Component , OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogCalculateComponent} from "./dialog-calculate/dialog-calculate.component";
import {DbService} from "../services/db.service";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {DialogAuthComponent} from "./dialog-auth/dialog-auth.component";


@Component({
  selector: 'app-dashboard' ,
  templateUrl: './dashboard.page.html' ,
  styleUrls: ['./dashboard.page.scss'] ,
})
export class DashboardPage implements OnInit {

  items;
  itemsInfos;
  data;
  Data: any[] = [];
  Data1: any[] = [];
  cp: number = 1;
  panelOpenState = false;
  title;
  langs: any[] = [];
  lang;
  accounts: any[] = [];

  btn_rdv_chgv;
  btn_reaprv;
  btn_stat;
  title_chvr;
  title_ordn;

  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              private localNotifications: LocalNotifications ,
              public dialog: MatDialog ,
              private db: DbService) {
    this.initializeItems();
    this.ngOnInit();
    this.simpleNotif()
  }

  simpleNotif() {
    this.localNotifications.schedule({
      id: 1 ,
      text: 'Single Local Notification' ,
      data: {secret: 'secret'}
    });
  }


  openDialog(title) {
    const dialogRef = this.dialog.open(DialogAuthComponent , {
      width: '60%' ,
      disableClose: true ,
      closeOnNavigation: false ,
      data: title
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchAccounts().subscribe(acc => {
          this.accounts = acc;
        });
      }
    });

    fetch("./assets/i18n/" + this.lang + ".json")
      .then((response) => response.json())
      .then((response) => {
        this.itemsInfos = response[0];
        this.items = response;
        this.title_chvr = this.itemsInfos.infos.dash_client.dialog.title_chvr;
        this.title_ordn = this.itemsInfos.infos.dash_client.dialog.title_ordn;
        this.btn_rdv_chgv = this.itemsInfos.infos.dash_client.btn_rdv_chgv;
        this.btn_stat = this.itemsInfos.infos.dash_client.btn_stat;
        this.btn_reaprv = this.itemsInfos.infos.dash_client.btn_reaprv;
      });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCalculates().subscribe(item => {
          this.Data = item;
        });
      }
    });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchOrdonnances().subscribe(item => {
          this.Data1 = item;
        });
      }
    });
  }


  initializeItems() {
    fetch("./assets/dictionary/" + this.lang + ".json")
      .then((response) => response.json())
      .then((response) => {
        this.data = response;
      });
    this.items = this.data;
  }


  openPage(header , item: any) {
    this.navController.navigateForward("definition" , {
      queryParams: {
        header: header ,
        data: item
      }
    });
  }

  openCalculate(header: any) {
    this.navController.navigateForward("calculate" , {
      queryParams: {
        header: header
      }
    });
  }

  openOrdonnance(header: any) {
    this.navController.navigateForward("ordonnance" , {
      queryParams: {
        header: header
      }
    });
  }


  goBack() {
    this.navController.navigateBack("home" , {});
  }


  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }


}
