import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Platform} from "@ionic/angular";

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  seleted = '';

  constructor(private translate: TranslateService ,
              private storage: Storage ,
              private plt: Platform) {
  }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang('cr');

    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.seleted = val;
      }
    })
  }

  getLanguages() {
    return [
      {text: 'Francais' , value: 'en' , img: ''} ,
      {text: 'Creole' , value: 'cr' , img: ''}
    ];
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.seleted = lng;
    this.storage.set(LNG_KEY , lng);
  }

}
