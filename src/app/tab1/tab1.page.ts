import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(private router: Router, public menuCtrl: MenuController) { }
  ngOnInit() {}

  // enable the side menu when redirect to dashboard page
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

  // redirect to product page with parameters
  gotoProduct(itemname, notDefined){
    console.log(itemname);
    if(notDefined === undefined){
      notDefined = "No"
      }
      this.router.navigate(['tabs/tabs/tab1/productlist', {id: itemname, id2: "No"}]);
  }


}
