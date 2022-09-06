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
