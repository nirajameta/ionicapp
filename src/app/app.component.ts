import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import datatable from './data.json';
import { Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  Users: any = datatable;
  public appPages: any;
  showLevel1 = null;
  showLevel2 = null;
  menuSide:any= [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public menuCtrl: MenuController,
    private _location: Location,
  ) {
    this.initializeApp();
  }
   initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this._location.isCurrentPathEqualTo('/signup')) {

        // Show Exit Alert!
        navigator['app'].exitApp();
        processNextHandler();
      } else {

        // Navigate to back page
        this._location.back();

      }

    });
  }
  //render the array from json data
  ngOnInit() {
    this.menuSide = this.Users.sideMenu;
    console.log(this.menuSide);
  }
  clearLevel() {
    this.showLevel1 = null;
    this.showLevel2 = null;
  }
  //toggle function for parent data
  toggleLevel1(idx: string, type) {
    console.log(type);
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  }
  isLevel1Shown(idx: string) {
    return this.showLevel1 === idx;
  }
  //toggle function for first child data
  toggleLevel2(idx: string, type, type1) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
    this.menuCtrl.close();
    this.router.navigate(['tabs/tabs/tab1/productlist', {id: type, id2: type1}]);
  }
  isLevel2Shown(idx: string) {
    return this.showLevel2 === idx;
  }
  //logout from dashboard  page
  logout(){
    localStorage.removeItem("registerdata");
    this.menuCtrl.close();
    this.router.navigate(['/signup']);
  }
}
