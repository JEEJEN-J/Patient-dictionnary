import {Component , Inject , OnInit} from '@angular/core';
import {FormBuilder , FormControl , FormGroup , Validators} from "@angular/forms";
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../services/db.service";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-dialog-form' ,
  templateUrl: './dialog-form.component.html' ,
  styleUrls: ['./dialog-form.component.scss'] ,
  providers: [DatePipe]
})
export class DialogFormComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  mainForm: FormGroup;
  currentDate = new Date();

  langs: any[] = [];
  lang;
  itemsInfos;
  title_chvr;
  modif_title_chvr;
  result_chv;
  detectable;
  indetectable;
  date_visit;
  btn_annuler;
  btn_valider;
  btn_modif;

  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              public formBuilder: FormBuilder ,
              private toast: ToastController ,
              private db: DbService ,
              private datePipe: DatePipe ,
              @Inject(MAT_DIALOG_DATA) public data: any) {
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
        this.result_chv = this.itemsInfos.infos.dash_client.dialog.result_chv;
        this.detectable = this.itemsInfos.infos.dash_client.dialog.detectable;
        this.indetectable = this.itemsInfos.infos.dash_client.dialog.indetectable;
        this.date_visit = this.itemsInfos.infos.dash_client.dialog.date_visit;
        this.btn_annuler = this.itemsInfos.infos.dash_client.dialog.btn_annuler;
        this.btn_valider = this.itemsInfos.infos.dash_client.dialog.btn_valider;
        this.btn_modif = this.itemsInfos.infos.dash_client.dialog.btn_modif;
        this.modif_title_chvr = this.itemsInfos.infos.dash_client.dialog.modif_title_chvr;
      });

    this.mainForm = this.formBuilder.group({
      status: [this.data.status , Validators.required] ,
      date: [this.date]
    });
  }


  openCalculate(header: any) {
    this.navController.navigateForward("calculate" , {
      queryParams: {
        header: header
      }
    });
  }


  storeData() {
    let lastDate = this.datePipe.transform(this.date.value , 'yyyy-MM-dd' , null , 'en').toString();
    let nextDateCurrent = new Date(this.date.value);

    if ((this.mainForm.getRawValue().status == 'Indétectable') || this.mainForm.getRawValue().numberOfDays < 1000)
      nextDateCurrent.setDate(nextDateCurrent.getDate() + 90);
    else if ((this.mainForm.getRawValue().status == 'Détectable') || this.mainForm.getRawValue().numberOfDays >= 1000)
      nextDateCurrent.setDate(nextDateCurrent.getDate() + 365);

    let nextDate = this.datePipe.transform(nextDateCurrent , 'yyyy-MM-dd' , null , 'en').toString();

    this.db.updateCalculate(this.data.id , this.mainForm.getRawValue().status, lastDate , nextDate).then(async (res) => {
      this.mainForm.reset();
      let toast = await this.toast.create({
        message: 'Calculate updated' ,
        duration: 1500 ,
        color: "primary"
      });
      toast.present();
      this.openCalculate('Calculate for');
    });
  }


}
