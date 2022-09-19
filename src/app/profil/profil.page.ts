import {Component , OnInit} from '@angular/core';
import {NavController , ToastController} from "@ionic/angular";
import {DbService} from "../services/db.service";
import {FormBuilder , FormGroup , Validators} from "@angular/forms";

@Component({
  selector: 'app-profil' ,
  templateUrl: './profil.page.html' ,
  styleUrls: ['./profil.page.scss'] ,
})
export class ProfilPage implements OnInit {

  mainForm: FormGroup;
  hide = true;
  confirmHide = true;
  accounts: any[] = [];

  message;

  langs: any[] = [];
  lang;
  itemsInfos;
  title;
  username;
  password;
  save;

  constructor(public navController: NavController ,
              public formBuilder: FormBuilder ,
              private toast: ToastController ,
              private db: DbService) {
  }

  ngOnInit() {
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
        this.title = this.itemsInfos.infos.profil.title;
        this.username = this.itemsInfos.infos.profil.username;
        this.password = this.itemsInfos.infos.profil.password;
        this.save = this.itemsInfos.infos.profil.save;
      });

    this.mainForm = this.formBuilder.group({
      username: ['' , Validators.required] ,
      password: ['' , Validators.required]
    });

  }

  async submit() {
    console.log('accounts : ' , this.accounts.length)
    if (this.accounts.length == 0) {
      this.db.addAccount(this.mainForm.getRawValue().username , this.mainForm.getRawValue().password)
      let toast = await this.toast.create({
        message: 'Profile sauvegarder avec succes !' ,
        duration: 1200 ,
        color: "success"
      });
      toast.present();
    } else {
      console.log('user : ' , this.accounts)
    }
  }

  goBack() {
    this.navController.navigateBack("home" , {});
  }

}
