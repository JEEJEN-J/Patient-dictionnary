import {Component , OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {DbService} from "../services/db.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogFormComponent} from "./dialog-form/dialog-form.component";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-calculate' ,
  templateUrl: './calculate.page.html' ,
  styleUrls: ['./calculate.page.scss'] ,
  providers: [DatePipe]
})
export class CalculatePage implements OnInit {

  content: any;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';

  value;
  realValue = 0;
  percentValue = 100;
  maxValue = 1000;
  val = 0;
  remainingDays = 0;
  data: any[] = [];
  MS_PER_DAY = 1000 * 60 * 60 * 24;

  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  myInterval: any;


  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              private db: DbService ,
              public dialog: MatDialog) {
    // this.ngOnInit();
  }


  openDialog(item) {
    const dialogRef = this.dialog.open(DialogFormComponent , {
      disableClose: true ,
      closeOnNavigation: false ,
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteCalculate() {
    this.db.deleteCalculate(this.data[0].id);
    this.goBack();
  }


  dateDiffInDays(a , b) {
    const utc1 = Date.UTC(a.getFullYear() , a.getMonth() , a.getDate());
    const utc2 = Date.UTC(b.getFullYear() , b.getMonth() , b.getDate());
    return Math.floor((utc2 - utc1) / this.MS_PER_DAY);
  }


  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCalculates().subscribe(item => {
          this.data = item;

          let date = new Date();
          const b = new Date(this.data[0].nextDate);

          const difference = this.dateDiffInDays(date , b);
          this.remainingDays = difference;

          if ((this.data[0].status == 'Indétectable') || this.data[0].numberOfDays < 1000)
            this.realValue = Math.round(((difference) / 90) * 100);
          else if ((this.data[0].status == 'Détectable') || this.data[0].numberOfDays >= 1000)
            this.realValue = Math.round(((difference) / 365) * 100);
        });
      }
    });

    this.myInterval = setInterval(() => {
      this.commingSoonTime();
    } , 0);
  }


  commingSoonTime = () => {
    const endTimeParse = (Date.parse(new Date(this.data[0].nextDate).toString())) / 1000;
    const now = new Date();
    const nowParse = (Date.parse(now.toString()) / 1000);
    const timeLeft = endTimeParse - nowParse;
    const days = Math.floor(timeLeft / 86400);
    let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < 10)
      hours = 0 + hours;
    if (minutes < 10)
      minutes = 0 + minutes;
    if (seconds < 10)
      seconds = 0 + seconds;

    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;

    if (days == 0)
      this.deleteCalculate();
  }


  goBack() {
    this.navController.navigateBack("dashboard" , {queryParams: {title: 'Dashboard patient'}});
  }

}
