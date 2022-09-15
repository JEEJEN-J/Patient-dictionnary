import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {DbService} from "../services/db.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(public navController: NavController ,
              private db: DbService) { }

  ngOnInit() {
  }

  goBack() {
    this.navController.navigateBack("home" , {});
  }
}
