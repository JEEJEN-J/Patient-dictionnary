import {Component , OnInit} from '@angular/core';
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute , Router} from "@angular/router";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {DbService} from "../services/db.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogFormComponent} from "./dialog-form/dialog-form.component";


@Component({
  selector: 'app-calculate' ,
  templateUrl: './calculate.page.html' ,
  styleUrls: ['./calculate.page.scss'] ,
})
export class CalculatePage implements OnInit {

  content: any;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';

  value;
  realValue = 0;
  percentValue = 100;
  maxValue = 1000;
  data: any[] = [];


  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              private db: DbService ,
              private toast: ToastController ,
              public dialog: MatDialog) {
  }


  openDialog(item) {
    const dialogRef = this.dialog.open(DialogFormComponent , {
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCalculates().subscribe(item => {
          this.data = item;
          this.value = 100 - ((this.data[0].numberOfDays * this.percentValue) / this.maxValue);
        });
      }
    });
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.content = params;
      console.log("content : " , this.content);
    });
  }


  goBack() {
    this.navController.navigateBack("dashboard" , {queryParams: {title: 'Dashboard patient'}});
  }

}
