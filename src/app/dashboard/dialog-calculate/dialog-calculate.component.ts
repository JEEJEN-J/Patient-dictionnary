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

    if (this.title == 'Charge virale') {
      this.mainForm = this.formBuilder.group({
        status: ['' , Validators.required] ,
        numberOfDays: ['' , Validators.required] ,
        date: ['']
      });
    } else if (this.title == 'Ordonnance') {
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

    if (this.title == 'Charge virale') {
      if ((this.mainForm.getRawValue().status == 'Indétectable') || this.mainForm.getRawValue().numberOfDays < 1000)
        nextDateCurrent.setDate(nextDateCurrent.getDate() + 90);
      else if ((this.mainForm.getRawValue().status == 'Détectable') || this.mainForm.getRawValue().numberOfDays >= 1000)
        nextDateCurrent.setDate(nextDateCurrent.getDate() + 365);

      let nextDate = this.datePipe.transform(nextDateCurrent , 'yyyy-MM-dd' , null , 'en').toString();

      this.db.addCalculate(
        this.mainForm.getRawValue().status ,
        this.mainForm.getRawValue().numberOfDays ,
        lastDate ,
        nextDate
      ).then(async (res) => {
        this.mainForm.reset();
        let toast = await this.toast.create({
          message: 'Charge virale created' ,
          duration: 1500 ,
          color: "success"
        });
        toast.present();
        this.openCalculate('Calculate');
      });
    } else if (this.title == 'Ordonnance') {
      nextDateCurrent.setDate(nextDateCurrent.getDate() + this.mainForm.getRawValue().valueOrdn);
      let nextDate = this.datePipe.transform(nextDateCurrent , 'yyyy-MM-dd' , null , 'en').toString();
      this.db.addOrdonnance(
        this.mainForm.getRawValue().valueOrdn ,
        lastDate ,
        nextDate
      ).then(async (res) => {
        this.mainForm.reset();
        let toast = await this.toast.create({
          message: 'Ordonnance created' ,
          duration: 1500 ,
          color: "success"
        });
        toast.present();
        this.openOrdonnance('Ordonnance');
      });
    }

  }

}
