import { Component, OnInit } from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../services/db.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogOrdonnComponent} from "./dialog-ordonn/dialog-ordonn.component";

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.page.html',
  styleUrls: ['./ordonnance.page.scss'],
})
export class OrdonnancePage implements OnInit {

  content: any;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';

  value;
  realValue = 0;
  percentValue = 100;
  data: any[] = [];

  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              private db: DbService ,
              private toast: ToastController ,
              public dialog: MatDialog) {
    this.ngOnInit();
  }


  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchOrdonnances().subscribe(item => {
          this.data = item;
          this.value = 100 - ((this.realValue * this.percentValue) / this.data[0].valueOrdn);
        });
      }
    });
    // this.activatedRoute.queryParamMap.subscribe(params => {
    //   this.content = params;
    //   console.log("content : " , this.content);
    // });
  }


  openDialog(item) {
    const dialogRef = this.dialog.open(DialogOrdonnComponent , {
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  goBack() {
    this.navController.navigateBack("dashboard" , {queryParams: {title: 'Dashboard patient'}});
  }

}
