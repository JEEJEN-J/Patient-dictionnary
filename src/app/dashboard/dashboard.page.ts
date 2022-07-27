import {Component , OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogCalculateComponent} from "./dialog-calculate/dialog-calculate.component";
import {DbService} from "../services/db.service";


@Component({
  selector: 'app-dashboard' ,
  templateUrl: './dashboard.page.html' ,
  styleUrls: ['./dashboard.page.scss'] ,
})
export class DashboardPage implements OnInit {

  items;
  data;
  Data: any[] = [];
  Data1: any[] = [];
  cp: number = 1;
  panelOpenState = false;
  title;

  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              public dialog: MatDialog ,
              private db: DbService) {
    this.initializeItems();
  }


  openDialog(title) {
    const dialogRef = this.dialog.open(DialogCalculateComponent , {
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

    fetch("./assets/dictionary/data.json")
      .then((response) => response.json())
      .then((response) => {
        this.items = response;
        console.log("response" , response);
      });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCalculates().subscribe(item => {
          this.Data = item;
        });
        this.db.fetchOrdonnances().subscribe(item => {
          this.Data1 = item;
        });
      }
    });
  }


  initializeItems() {
    fetch("./assets/dictionary/data.json")
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
