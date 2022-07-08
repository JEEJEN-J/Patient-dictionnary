import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-definition-parent',
  templateUrl: './definition-parent.page.html',
  styleUrls: ['./definition-parent.page.scss'],
})
export class DefinitionParentPage implements OnInit {

  content: any;
  dashboard: any;

  constructor(public navController: NavController , private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.content = params;
      console.log("content : " , this.content);
    })
  }


  onChange(item: any , title: any) {
    var data = item.params.data;
    var obj = Object.assign({data} , {header: title});
    this.content.params = null;
    this.content.params = obj;
    console.log("changed : " , this.content);
  }


  goBack() {
    this.navController.navigateBack("dashboard" , {queryParams: {title: 'Dashboard Parent patient'}});
  }


}
