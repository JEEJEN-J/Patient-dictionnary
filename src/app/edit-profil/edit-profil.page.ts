import {Component , OnInit} from '@angular/core';
import {FormBuilder , FormGroup , Validators} from "@angular/forms";
import {NavController , ToastController} from "@ionic/angular";
import {DbService} from "../services/db.service";

@Component({
  selector: 'app-edit-profil' ,
  templateUrl: './edit-profil.page.html' ,
  styleUrls: ['./edit-profil.page.scss'] ,
})
export class EditProfilPage implements OnInit {

  mainForm: FormGroup;
  mainForm1: FormGroup;
  hide = true;
  hide1 = true;
  confirmHide = true;
  accounts: any[] = [];

  message;

  langs: any[] = [];
  lang;
  itemsInfos;
  title;
  username;
  oldPassword;
  newPassword;
  resetPassword;
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
        this.title = this.itemsInfos.infos.edit_profile.title;
        this.username = this.itemsInfos.infos.edit_profile.username;
        this.oldPassword = this.itemsInfos.infos.edit_profile.oldPassword;
        this.newPassword = this.itemsInfos.infos.edit_profile.newPassword;
        this.resetPassword = this.itemsInfos.infos.edit_profile.resetPassword;
        this.save = this.itemsInfos.infos.edit_profile.save;
      });

    this.mainForm = this.formBuilder.group({
      username: [this.accounts[0].username , Validators.required]
    });

    this.mainForm1 = this.formBuilder.group({
      password: ['' , Validators.required] ,
      newPassword: ['' , Validators.required]
    });

  }

  async submitUsername() {
    console.log('username : ' , this.accounts[0].username)
    this.db.updateAccount(this.accounts[0].id , this.mainForm.getRawValue().username , this.accounts[0].password);
    let toast = await this.toast.create({
      message: "Nom d'utilisateur modifie avec succes !" ,
      duration: 1500 ,
      color: "primary"
    });
    toast.present();
  }

  async submitPassword() {
    console.log('password : ' , this.accounts[0].password)
    if (this.accounts[0].password == this.mainForm1.getRawValue().password) {
      this.db.updateAccount(this.accounts[0].id , this.accounts[0].username , this.mainForm1.getRawValue().newPassword);
      let toast = await this.toast.create({
        message: 'Mot de passe modifie avec succes !' ,
        duration: 1500 ,
        color: "primary"
      });
      toast.present();
    } else {
      let toast = await this.toast.create({
        message: "Mot de passe introuvable !" ,
        duration: 1500 ,
        color: "warning"
      });
      toast.present();
    }
  }

  goBack() {
    this.navController.navigateBack("home" , {});
  }

}
