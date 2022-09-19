import {Component , Inject , OnInit} from '@angular/core';
import {FormBuilder , FormControl , FormGroup , Validators} from "@angular/forms";
import {NavController , ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../services/db.service";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA , MatDialog} from "@angular/material/dialog";
import {DialogCalculateComponent} from "../dialog-calculate/dialog-calculate.component";

@Component({
  selector: 'app-dialog-auth' ,
  templateUrl: './dialog-auth.component.html' ,
  styleUrls: ['./dialog-auth.component.scss'] ,
})
export class DialogAuthComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  mainForm: FormGroup;
  currentDate = new Date();

  hide = true;
  Data: any[] = [];
  Data1: any[] = [];

  accounts: any[] = [];
  langs: any[] = [];
  lang;
  itemsInfos;
  title_chvr;
  title_ordn;
  dialogTitle;
  password;
  btn_clear;
  btn_search;


  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              public formBuilder: FormBuilder ,
              private toast: ToastController ,
              private db: DbService ,
              public dialog: MatDialog ,
              @Inject(MAT_DIALOG_DATA) public title: any) {
  }


  ngOnInit() {

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCalculates().subscribe(item => {
          this.Data = item;
        });
      }
    });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchOrdonnances().subscribe(item => {
          this.Data1 = item;
        });
      }
    });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchAccounts().subscribe(acc => {
          this.accounts = acc;
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
        this.dialogTitle = this.itemsInfos.auth.title;
        this.password = this.itemsInfos.auth.password;
        this.btn_clear = this.itemsInfos.auth.btn_clear;
        this.btn_search = this.itemsInfos.auth.btn_search;

      });

    this.mainForm = this.formBuilder.group({
      password: ['' , Validators.required] ,
    });
  }


  async submitPassword() {
    console.log('password : ' , this.accounts[0].password)
    if (this.accounts[0].password == this.mainForm.getRawValue().password) {
      if (this.title == 'Charge virale' || this.title == 'Chaj viral') {
        if (this.Data.length == 0) {
          this.openDialog(this.title_chvr);
        } else if (this.Data.length > 0) {
          this.openCalculate(this.title_chvr);
        }
      } else if (this.title == 'Ordonnance' || this.title == 'òdonans') {
        if (this.Data1.length == 0) {
          this.openDialog(this.title_ordn);
        } else if (this.Data1.length > 0) {
          this.openOrdonnance(this.title_ordn);
        }
      }
    } else if (this.accounts[0].password != this.mainForm.getRawValue().password) {
      let toast = await this.toast.create({
        message: "Mot de passe introuvable !" ,
        duration: 2000 ,
        color: "warning"
      });
      toast.present();
    }
  }

  openDialog(title) {
    const dialogRef = this.dialog.open(DialogCalculateComponent , {
      width: '60%' ,
      disableClose: true ,
      closeOnNavigation: false ,
      data: title
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

}
