import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject , Observable} from 'rxjs';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {SQLite , SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Calculate} from "../models/calculate";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  calculatesList = new BehaviorSubject([]);
  ordonnancesList = new BehaviorSubject([]);
  chargeViralesList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform ,
    private sqlite: SQLite ,
    private httpClient: HttpClient ,
    private sqlPorter: SQLitePorter ,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'repporting.db' ,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchCalculates(): Observable<Calculate[]> {
    return this.calculatesList.asObservable();
  }

  fetchOrdonnances(): Observable<Calculate[]> {
    return this.ordonnancesList.asObservable();
  }

  fetchChargeVirales(): Observable<Calculate[]> {
    return this.chargeViralesList.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/db.sql' ,
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage , data)
        .then(_ => {
          this.getCalculates();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  /**
   * Get all Calculates list
   * */
  getCalculates() {
    return this.storage.executeSql('SELECT * FROM Calculate' , []).then(res => {
      let items: Calculate[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id ,
            numberOfDays: res.rows.item(i).numberOfDays ,
            lastDate: res.rows.item(i).lastDate ,
            nextDate: res.rows.item(i).nextDate
          });
        }
      }
      this.calculatesList.next(items);
    });
  }

  /**
   * Add a new Calculate
   *
   * @param {numberOfDays and lastDate}
   * */
  addCalculate(numberOfDays , lastDate, nextDate) {
    let data = [numberOfDays , lastDate, nextDate];
    return this.storage.executeSql('INSERT INTO Calculate (numberOfDays, lastDate, nextDate) VALUES (?, ?, ?)' , data)
      .then((res) => {
        this.getCalculates();
      });
  }

  /**
   * Get a Calculate by ID
   *
   * @param id
   * */
  getCalculate(id): Promise<Calculate> {
    return this.storage.executeSql('SELECT * FROM Calculate WHERE id = ?' , [id]).then(res => {
      return {
        id: res.rows.item(0).id ,
        numberOfDays: res.rows.item(0).numberOfDays ,
        lastDate: res.rows.item(0).lastDate,
        nextDate: res.rows.item(0).nextDate
      }
    });
  }

  /**
   * Update the Calculate
   *
   * @param {id and {calculate}}
   * */
  updateCalculate(id , calculate: Calculate) {
    let data = [calculate.numberOfDays , calculate.lastDate, calculate.nextDate];
    return this.storage.executeSql(`UPDATE Calculate
                                    SET numberOfDays = ?,
                                        lastDate   = ?,
                                        nextDate   = ?
                                    WHERE id = ${id}` , data)
      .then(data => {
        this.getCalculates();
      })
  }

  /**
   * Delete a Calculate
   *
   * @param id
   * */
  deleteCalculate(id) {
    return this.storage.executeSql('DELETE FROM Calculate WHERE id = ?' , [id])
      .then(_ => {
        this.getCalculates();
      });
  }
}
