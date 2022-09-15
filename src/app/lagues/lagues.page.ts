import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {DbService} from "../services/db.service";

@Component({
  selector: 'app-lagues',
  templateUrl: './lagues.page.html',
  styleUrls: ['./lagues.page.scss'],
})
export class LaguesPage implements OnInit {

  constructor(public navController: NavController ,
              private db: DbService) { }

  ngOnInit() {
  }

  goBack() {
    this.navController.navigateBack("home" , {});
  }

}
