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


  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              private db: DbService ,
              private datePipe: DatePipe ,
              public dialog: MatDialog) {
    this.ngOnInit();
  }


  openDialog(item) {
    const dialogRef = this.dialog.open(DialogFormComponent , {
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
          this.value = 100 - ((this.data[0].numberOfDays * this.percentValue) / this.maxValue);

          const a = new Date(this.data[0].lastDate);
          const b = new Date(this.data[0].nextDate);

          let date = new Date();

          const difference = this.dateDiffInDays(date , b);
          // alert(a + " = " + date)

          this.remainingDays = difference+1;

          if ((this.data[0].status == 'Indétectable') || this.data[0].numberOfDays < 1000)
            this.realValue = Math.round((difference / 90) * 100);
          else if ((this.data[0].status == 'Détectable') || this.data[0].numberOfDays >= 1000)
            this.realValue = Math.round((difference / 365) * 100);

        });
      }
    });
  }


  goBack() {
    this.navController.navigateBack("dashboard" , {queryParams: {title: 'Dashboard patient'}});
  }

}
