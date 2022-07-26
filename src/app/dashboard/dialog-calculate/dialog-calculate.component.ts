import {Component , OnInit} from '@angular/core';
import {FormBuilder , FormControl , FormGroup , Validator , Validators} from '@angular/forms';
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute , Router} from "@angular/router";
import {DbService} from "../../services/db.service";
import {DatePipe , formatDate} from "@angular/common";

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
        duration: 1500,
        color: "success"
      });
      toast.present();
      this.openCalculate('Calculate for');
    });
  }

}
