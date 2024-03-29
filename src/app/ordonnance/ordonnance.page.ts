import {Component , OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../services/db.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogOrdonnComponent} from "./dialog-ordonn/dialog-ordonn.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-ordonnance' ,
  templateUrl: './ordonnance.page.html' ,
  styleUrls: ['./ordonnance.page.scss'] ,
  providers: [DatePipe]
})
export class OrdonnancePage implements OnInit {

  content: any;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';

  value;
  realValue = 0;
  percentValue = 100;
  data: any[] = [];
  MS_PER_DAY = 1000 * 60 * 60 * 24;
  remainingDays = 0;

  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  myInterval: any;

  itemsInfos;
  langs: any[] = [];
  lang;
  title;
  percent_tile;
  infomations;
  last_date;
  next_date;
  aprovmnt;
  nb_days;
  tablePatient;


  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              private db: DbService ,
              private toast: ToastController ,
              public dialog: MatDialog) {
    this.ngOnInit();
  }


  dateDiffInDays(a , b) {
    const utc1 = Date.UTC(a.getFullYear() , a.getMonth() , a.getDate());
    const utc2 = Date.UTC(b.getFullYear() , b.getMonth() , b.getDate());
    return Math.floor((utc2 - utc1) / this.MS_PER_DAY);
  }


  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchOrdonnances().subscribe(item => {
          this.data = item;

          let date = new Date();
          const b = new Date(this.data[0].nextDate);

          const difference = this.dateDiffInDays(date , b);

          this.remainingDays = difference;
          this.realValue = Math.round(((difference) / ((this.data[0].valueOrdn - 1) * 30)) * 100);
        });
      }
    });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchLangs().subscribe(lng => {
          this.langs = lng;
          if (this.langs.length == 0) {
            this.lang = 'fr';
          } else {
            this.lang = this.langs[0].lang;
          }
        });
      }
    });

    fetch("./assets/i18n/" + this.lang + ".json")
      .then((response) => response.json())
      .then((response) => {
        this.itemsInfos = response[0];
        this.tablePatient = this.itemsInfos.header;
        this.title = this.itemsInfos.infos.ordonnance.title;
        this.percent_tile = this.itemsInfos.infos.ordonnance.percent_tile;
        this.infomations = this.itemsInfos.infos.ordonnance.infomations;
        this.last_date = this.itemsInfos.infos.ordonnance.last_date;
        this.next_date = this.itemsInfos.infos.ordonnance.next_date;
        this.aprovmnt = this.itemsInfos.infos.ordonnance.aprovmnt;
        this.nb_days = this.itemsInfos.infos.ordonnance.nb_days;
      });

    this.myInterval = setInterval(() => {
      this.commingSoonTime();
    } , 0);
  }


  deleteOrdonnance() {
    this.db.deleteOrdonnance(this.data[0].id);
    this.goBack();
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
      this.deleteOrdonnance();
  }


  openDialog(item) {
    const dialogRef = this.dialog.open(DialogOrdonnComponent , {
      disableClose: true ,
      closeOnNavigation: false ,
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  goBack() {
    this.navController.navigateBack("dashboard" , {queryParams: {title: this.tablePatient}});
  }

}
