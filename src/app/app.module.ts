import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule , IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {SQLite} from "@ionic-native/sqlite/ngx";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";

@NgModule({
  declarations: [AppComponent] ,
  entryComponents: [] ,
  imports: [
    BrowserModule ,
    IonicModule.forRoot() ,
    AppRoutingModule ,
    BrowserAnimationsModule,
    HttpClientModule
  ] ,
  providers: [
    SQLite,
    SQLitePorter,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: RouteReuseStrategy ,
      useClass: IonicRouteStrategy
    }
  ] ,
  bootstrap: [AppComponent] ,
})
export class AppModule {
}
