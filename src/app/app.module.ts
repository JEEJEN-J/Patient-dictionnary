import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule , IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule , HttpClient} from "@angular/common/http";
import {TranslateModule , TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {SQLite} from "@ionic-native/sqlite/ngx";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {EmbedVideo} from "ngx-embed-video";
import {LocalNotifications} from '@ionic-native/local-notifications/ngx'
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {createTranslationLoader} from "@angular-devkit/build-angular/src/utils/load-translations";
import {LanguageService} from "./services/language.service";
import {ProfilPageModule} from "./profil/profil.module";
// import {IonicStorageModule} from '@ionic/storage';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http , "./assets/i18n/" , ".json");
}


@NgModule({
  declarations: [AppComponent] ,
  entryComponents: [] ,
  imports: [
    BrowserModule ,
    IonicModule.forRoot() ,
    AppRoutingModule ,
    // IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader ,
        useFactory: (createTranslationLoader) ,
        deps: [HttpClient]
      }
    }) ,
    BrowserAnimationsModule ,
    HttpClientModule ,
    EmbedVideo.forRoot() ,
    ProfilPageModule
  ] ,
  providers: [
    LanguageService,
    Storage,

    LocalNotifications ,
    SQLite ,
    SQLitePorter ,
    {
      provide: RouteReuseStrategy ,
      useClass: IonicRouteStrategy
    } ,
    {
      provide: RouteReuseStrategy ,
      useClass: IonicRouteStrategy
    }
  ] ,
  bootstrap: [AppComponent] ,
})
export class AppModule {

}
