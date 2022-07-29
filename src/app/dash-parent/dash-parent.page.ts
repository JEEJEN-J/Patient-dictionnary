import {Component , OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dash-parent' ,
  templateUrl: './dash-parent.page.html' ,
  styleUrls: ['./dash-parent.page.scss'] ,
})
export class DashParentPage implements OnInit {

  items;
  data;
  cp: number = 1;
  panelOpenState = false;
  title;


  constructor(public navController: NavController , private activatedRoute: ActivatedRoute) {
    this.initializeItems();
  }

  initializeItems() {
    fetch("./assets/dictionary/dataParent.json")
      .then((response) => response.json())
      .then((response) => {
        this.data = response;
      });
    this.items = this.data;
  }

  getInfo() {

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

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.title = params;
    });
    fetch("./assets/dictionary/dataParent.json")
      .then((response) => response.json())
      .then((response) => {
        this.items = response;
        console.log("response" , response);
      });
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
