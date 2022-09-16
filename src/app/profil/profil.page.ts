import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {DbService} from "../services/db.service";
import {FormBuilder , FormGroup , Validators} from "@angular/forms";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  mainForm: FormGroup;
  hide = true;

  constructor(public navController: NavController ,
              public formBuilder: FormBuilder ,
              private db: DbService) { }

  ngOnInit() {
    this.mainForm = this.formBuilder.group({
      username: ['' , Validators.required] ,
      password: ['' , Validators.required] ,
      confirmPassword: ['' , Validators.required] ,
    });
  }

  goBack() {
    this.navController.navigateBack("home" , {});
  }
}
