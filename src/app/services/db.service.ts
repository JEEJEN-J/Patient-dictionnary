import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject , Observable} from 'rxjs';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {SQLite , SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Calculate} from "../models/calculate";
import {Ordonnance} from "../models/ordonnance";
import {Account , Languages} from "../models/account";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  calculatesList = new BehaviorSubject([]);
  ordonnancesList = new BehaviorSubject([]);
  accountList = new BehaviorSubject([]);
  languagesList = new BehaviorSubject([]);
  public isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

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


  fetchOrdonnances(): Observable<Ordonnance[]> {
    return this.ordonnancesList.asObservable();
  }

  fetchAccounts(): Observable<Account[]> {
    return this.accountList.asObservable();
  }

  fetchLangs(): Observable<Languages[]> {
    return this.languagesList.asObservable();
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
          this.getOrdonnances();
          this.getAccounts();
          this.getLangs();
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
            status: res.rows.item(i).status ,
            lastDate: res.rows.item(i).lastDate ,
            nextDate: res.rows.item(i).nextDate
          });
        }
      }
      this.calculatesList.next(items);
      this.isDbReady.next(true);
    });
  }


  /**
   * Get all Ordonnances list
   * */
  getOrdonnances() {
    return this.storage.executeSql('SELECT * FROM Ordonnance' , []).then(res => {
      let items: Ordonnance[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id ,
            valueOrdn: res.rows.item(i).valueOrdn ,
            lastDate: res.rows.item(i).lastDate ,
            nextDate: res.rows.item(i).nextDate
          });
        }
      }
      this.ordonnancesList.next(items);
      this.isDbReady.next(true);
    });
  }

  /**
   * Get all Accounts list
   * */
  getAccounts() {
    return this.storage.executeSql('SELECT * FROM account' , []).then(res => {
      let items: Account[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id ,
            username: res.rows.item(i).username ,
            password: res.rows.item(i).password
          });
        }
      }
      this.accountList.next(items);
      this.isDbReady.next(true);
    });
  }

  /**
   * Get all Lang list
   * */
  getLangs() {
    return this.storage.executeSql('SELECT * FROM languages' , []).then(res => {
      let items: Languages[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id ,
            lang: res.rows.item(i).lang
          });
        }
      }
      this.languagesList.next(items);
      this.isDbReady.next(true);
    });
  }

  /**
   * Add a new Calculate
   *
   * @param {numberOfDays and lastDate}
   * */
  addCalculate(status , lastDate , nextDate) {
    let data = [status , lastDate , nextDate];
    return this.storage.executeSql('INSERT INTO Calculate (status, lastDate, nextDate) VALUES (?, ?, ?)' , data)
      .then((res) => {
        this.getCalculates();
      });
  }

  /**
   * Add a new Ordonnance
   *
   * @param {valueOrdn and lastDate}
   * */
  addOrdonnance(valueOrdn , lastDate , nextDate) {
    let data = [valueOrdn , lastDate , nextDate];
    return this.storage.executeSql('INSERT INTO Ordonnance (valueOrdn, lastDate, nextDate) VALUES (?, ?, ?)' , data)
      .then((res) => {
        this.getOrdonnances();
      });
  }

  /**
   * Add a new Account
   *
   * @param {username and password}
   * */
  addAccount(username , password) {
    let data = [username , password];
    return this.storage.executeSql('INSERT INTO account (username, password) VALUES (?, ?)' , data)
      .then((res) => {
        this.getAccounts();
      });
  }

  /**
   * Add a new Lang
   *
   * @param {lang}
   * */
  addLang(lang) {
    let data = [lang];
    return this.storage.executeSql('INSERT INTO languages (lang) VALUES (?)' , data)
      .then((res) => {
        this.getLangs();
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
        status: res.rows.item(0).status ,
        lastDate: res.rows.item(0).lastDate ,
        nextDate: res.rows.item(0).nextDate
      }
    });
  }

  /**
   * Get a Ordonnance by ID
   *
   * @param id
   * */
  getOrdonnance(id): Promise<Ordonnance> {
    return this.storage.executeSql('SELECT * FROM Ordonnance WHERE id = ?' , [id]).then(res => {
      return {
        id: res.rows.item(0).id ,
        valueOrdn: res.rows.item(0).valueOrdn ,
        lastDate: res.rows.item(0).lastDate ,
        nextDate: res.rows.item(0).nextDate
      }
    });
  }

  /**
   * Get a Account by ID
   *
   * @param id
   * */
  getAccount(id): Promise<Account> {
    return this.storage.executeSql('SELECT * FROM account WHERE id = ?' , [id]).then(res => {
      return {
        id: res.rows.item(0).id ,
        username: res.rows.item(0).username ,
        password: res.rows.item(0).password
      }
    });
  }

  /**
   * Get a Account by username
   *
   * @param username
   * */
  getAccountByUsername(username): Promise<Account> {
    return this.storage.executeSql('SELECT * FROM account WHERE username = ?' , [username]).then(res => {
      return {
        id: res.rows.item(0).id ,
        username: res.rows.item(0).username ,
        password: res.rows.item(0).password
      }
    });
  }

  /**
   * Get a Account by password
   *
   * @param password
   * */
  getAccountByPassword(password): Promise<Account> {
    return this.storage.executeSql('SELECT * FROM account WHERE password = ?' , [password]).then(res => {
      return {
        id: res.rows.item(0).id ,
        username: res.rows.item(0).username ,
        password: res.rows.item(0).password
      }
    });
  }

  /**
   * Get a Lang by ID
   *
   * @param id
   * */
  getLang(id): Promise<Languages> {
    return this.storage.executeSql('SELECT * FROM languages WHERE id = ?' , [id]).then(res => {
      return {
        id: res.rows.item(0).id ,
        lang: res.rows.item(0).lang
      }
    });
  }

  /**
   * Update the Calculate
   *
   * @param {id and {calculate}}
   * */
  updateCalculate(id , status , lastDate , nextDate) {
    let data = [status , lastDate , nextDate];
    return this.storage.executeSql(`UPDATE Calculate
                                    SET status   = ?,
                                        lastDate = ?,
                                        nextDate = ?
                                    WHERE id = ${id}` , data)
      .then(data => {
        this.getCalculates();
      })
  }

  /**
   * Update the Ordonnance
   *
   * @param {id and {ordonnance}}
   * */
  updateOrdonnance(id , valueOrdn , lastDate , nextDate) {
    let data = [valueOrdn , lastDate , nextDate];
    return this.storage.executeSql(`UPDATE Ordonnance
                                    SET valueOrdn = ?,
                                        lastDate  = ?,
                                        nextDate  = ?
                                    WHERE id = ${id}` , data)
      .then(data => {
        this.getOrdonnances();
      })
  }

  /**
   * Update the Account
   *
   * @param {id and {account}}
   * */
  updateAccount(id , username , password) {
    let data = [username , password];
    return this.storage.executeSql(`UPDATE account
                                    SET username    = ?,
                                        password    = ?
                                    WHERE id = ${id}` , data)
      .then(data => {
        this.getAccounts();
      })
  }

  /**
   * Update the Lang
   *
   * @param {id and lang}
   * */
  updateLang(id , lang) {
    let data = [lang];
    return this.storage.executeSql(`UPDATE languages
                                    SET lang = ?
                                    WHERE id = ${id}` , data)
      .then(data => {
        this.getLangs();
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

  /**
   * Delete a ordonnance
   *
   * @param id
   * */
  deleteOrdonnance(id) {
    return this.storage.executeSql('DELETE FROM Ordonnance WHERE id = ?' , [id])
      .then(_ => {
        this.getOrdonnances();
      });
  }

  /**
   * Delete a account
   *
   * @param id
   * */
  deleteAccount(id) {
    return this.storage.executeSql('DELETE FROM account WHERE id = ?' , [id])
      .then(_ => {
        this.getAccounts();
      });
  }

}
