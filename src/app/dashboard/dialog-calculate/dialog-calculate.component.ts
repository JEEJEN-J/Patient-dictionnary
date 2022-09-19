import {Component , Inject , OnInit} from '@angular/core';
import {FormBuilder , FormControl , FormGroup , Validator , Validators} from '@angular/forms';
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute , Router} from "@angular/router";
import {DbService} from "../../services/db.service";
import {DatePipe , formatDate} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-calculate' ,
  templateUrl: './dialog-calculate.component.html' ,
  styleUrls: ['./dialog-calculate.component.scss'] ,
  providers: [DatePipe]
})
export class DialogCalculateComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  mainForm: FormGroup;
  currentDate = new Date();

  langs: any[] = [];
  lang;
  itemsInfos;
  title_chvr;
  title_ordn;
  result_chv;
  detectable;
  indetectable;
  date_visit;
  btn_annuler;
  btn_valider;
  nb_aprovmnt;

  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              public formBuilder: FormBuilder ,
              private toast: ToastController ,
              private db: DbService ,
              private datePipe: DatePipe ,
              @Inject(MAT_DIALOG_DATA) public title: any) {
  }


  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCalculates().subscribe(item => {
        });
      }
    });
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchOrdonnances().subscribe(item => {
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
        this.title_chvr = this.itemsInfos.infos.dash_client.dialog.title_chvr;
        this.title_ordn = this.itemsInfos.infos.dash_client.dialog.title_ordn;
        this.result_chv = this.itemsInfos.infos.dash_client.dialog.result_chv;
        this.detectable = this.itemsInfos.infos.dash_client.dialog.detectable;
        this.indetectable = this.itemsInfos.infos.dash_client.dialog.indetectable;
        this.date_visit = this.itemsInfos.infos.dash_client.dialog.date_visit;
        this.btn_annuler = this.itemsInfos.infos.dash_client.dialog.btn_annuler;
        this.btn_valider = this.itemsInfos.infos.dash_client.dialog.btn_valider;
        this.nb_aprovmnt = this.itemsInfos.infos.dash_client.dialog.nb_aprovmnt;
      });

    if (this.title == 'Charge virale' || this.title == 'Chaj viral') {
      this.mainForm = this.formBuilder.group({
        status: ['' , Validators.required] ,
        date: ['']
      });
    } else if (this.title == 'Ordonnance' || this.title == 'òdonans') {
      this.mainForm = this.formBuilder.group({
        valueOrdn: ['' , Validators.required] ,
        date: ['']
      });
    }
  }

  openCalculate(header: any) {
    this.navController.navigateForward("calculate" , {
      queryParams: {
        header: header
      }
    });
  }

  openOrdonnance(header: any) {
    this.navController.navigateForward("ordonnance" , {
      queryParams: {
        header: header
      }
    });
  }

  storeData() {
    let lastDate = this.datePipe.transform(this.date.value , 'yyyy-MM-dd' , null , 'en').toString();
    let nextDateCurrent = new Date(this.date.value);

    if (this.title == 'Charge virale' || this.title == 'Chaj viral') {
      if ((this.mainForm.getRawValue().status == 'Indétectable'))
        nextDateCurrent.setDate(nextDateCurrent.getDate() + 90);
      else if ((this.mainForm.getRawValue().status == 'Détectable'))
        nextDateCurrent.setDate(nextDateCurrent.getDate() + 365);

      let nextDate = this.datePipe.transform(nextDateCurrent , 'yyyy-MM-dd' , null , 'en').toString();

      this.db.addCalculate(
        this.mainForm.getRawValue().status ,
        lastDate ,
        nextDate
      ).then(async (res) => {
        this.mainForm.reset();
        let toast = await this.toast.create({
          message: this.title_chvr + ' created' ,
          duration: 1500 ,
          color: "success"
        });
        toast.present();
        this.openCalculate(this.title_chvr);
      });
    } else if (this.title == 'Ordonnance' || this.title == 'òdonans') {
      nextDateCurrent.setDate(nextDateCurrent.getDate() + ((this.mainForm.getRawValue().valueOrdn - 1) * 30));
      let nextDate = this.datePipe.transform(nextDateCurrent , 'yyyy-MM-dd' , null , 'en').toString();
      this.db.addOrdonnance(
        this.mainForm.getRawValue().valueOrdn ,
        lastDate ,
        nextDate
      ).then(async (res) => {
        this.mainForm.reset();
        let toast = await this.toast.create({
          message: this.title_ordn + ' created' ,
          duration: 1500 ,
          color: "success"
        });
        toast.present();
        this.openOrdonnance(this.title_ordn);
      });
    }

  }

}
