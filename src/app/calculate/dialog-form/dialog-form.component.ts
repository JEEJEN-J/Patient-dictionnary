import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormControl , FormGroup , Validators} from "@angular/forms";
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../services/db.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
  providers: [DatePipe]
})
export class DialogFormComponent implements OnInit {


  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  mainForm: FormGroup;

  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              public formBuilder: FormBuilder ,
              private toast: ToastController ,
              private db: DbService ,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.mainForm = this.formBuilder.group({
      numberOfDays: ['' , Validators.required] ,
      date: ['']
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
    let lastDate = this.datePipe.transform(this.date.value , 'dd-MM-yyyy HH:mm:ss' , null , 'en').toString();

    let nextDateCurrent = new Date(this.date.value);
    nextDateCurrent.setDate(nextDateCurrent.getDate() + 30);
    let nextDate = this.datePipe.transform(nextDateCurrent , 'dd-MM-yyyy HH:mm:ss' , null , 'en').toString();

    this.db.addCalculate(
      this.mainForm.getRawValue().numberOfDays ,
      lastDate,
      nextDate
    ).then(async (res) => {
      this.mainForm.reset();
      let toast = await this.toast.create({
        message: 'Calculate created' ,
        duration: 1500
      });
      toast.present();
      this.openCalculate('Calculate for');
    });
  }

}
