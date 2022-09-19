import {Component , OnInit} from '@angular/core';
import {NavController , ToastController} from "@ionic/angular";
import {DbService} from "../services/db.service";
import {FormBuilder , FormGroup , Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lagues' ,
  templateUrl: './lagues.page.html' ,
  styleUrls: ['./lagues.page.scss'] ,
})
export class LaguesPage implements OnInit {

  mainForm: FormGroup;
  langs: any[] = [];
  lang;
  itemsInfos;
  settings;
  title;
  french;
  creole;
  save;

  constructor(public navController: NavController ,
              public formBuilder: FormBuilder ,
              public router: Router ,
              private toast: ToastController ,
              private db: DbService) {
  }

  ngOnInit() {
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
        this.title = this.itemsInfos.infos.langue.title;
        this.french = this.itemsInfos.infos.langue.french;
        this.creole = this.itemsInfos.infos.langue.creole;
        this.save = this.itemsInfos.infos.langue.save;
      });

    this.mainForm = this.formBuilder.group({
      lang: [this.lang , Validators.required]
    });
  }

  goBack() {
    this.router.navigate(['home'])
  }

  async submit() {
    if (this.langs.length == 0) {
      this.db.addLang(this.mainForm.getRawValue().lang);
      let toast = await this.toast.create({
        message: 'Langue changee' ,
        duration: 1200 ,
        color: "primary"
      });
      toast.present();
    } else if (this.langs.length == 1) {
      this.db.updateLang(this.langs[0].id , this.mainForm.getRawValue().lang)
      let toast = await this.toast.create({
        message: 'Langue changee' ,
        duration: 1200 ,
        color: "primary"
      });
      toast.present();
    }
  }


}
