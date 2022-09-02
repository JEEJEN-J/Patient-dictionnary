import {Component , Inject , OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FormBuilder , FormControl , FormGroup , Validators} from "@angular/forms";
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../services/db.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-ordonn' ,
  templateUrl: './dialog-ordonn.component.html' ,
  styleUrls: ['./dialog-ordonn.component.scss'] ,
  providers: [DatePipe]
})
export class DialogOrdonnComponent implements OnInit {

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
        this.db.fetchOrdonnances().subscribe(item => {
        });
      }
    });
    this.mainForm = this.formBuilder.group({
      valueOrdn: [this.data.valueOrdn , Validators.required] ,
      date: [this.date]
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
    nextDateCurrent.setDate(nextDateCurrent.getDate() + this.mainForm.getRawValue().valueOrdn);
    let nextDate = this.datePipe.transform(nextDateCurrent , 'yyyy-MM-dd' , null , 'en').toString();

    this.db.updateOrdonnance(this.data.id , this.mainForm.getRawValue().valueOrdn , lastDate , nextDate).then(async (res) => {
      this.mainForm.reset();
      let toast = await this.toast.create({
        message: 'Update successful' ,
        duration: 1500 ,
        color: "primary"
      });
      toast.present();
      this.openOrdonnance('Ordonnance medicale');
    });
  }

}
