import {Component , OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-dashboard' ,
  templateUrl: './dashboard.page.html' ,
  styleUrls: ['./dashboard.page.scss'] ,
})
export class DashboardPage implements OnInit {

  items;
  data;
  cp: number = 1;
  panelOpenState = false;
  title;


  constructor(public navController: NavController , private activatedRoute: ActivatedRoute) {
    this.initializeItems();
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
