import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {Location} from "@angular/common";



@Component({
  selector: 'app-productview',
  templateUrl: './productview.page.html',
  styleUrls: ['./productview.page.scss'],
})
export class ProductviewPage implements OnInit {
  fetchItem: string;
  pageTitle: string;
  itemPrice: string;
  diductprice: string;
  viewImage: any;
  iconHeart: string = "heart-outline";
  buttonColor: string = '#000';
  selectQuality: any;
  public selectedIndex;
  public selected: string;
  checkBoxList;
  selectedRadioGroup:any;
  defaultSelectedRadio = "radio_1";
  selectedRadioItem:any;
  sizeArr: any[] = [
    {
      'title': 'S'

    },
    {
      'title': 'M'
    },
    {
      'title': 'L'
    }, 
    {
      'title': 'XL'
    },
    {
      'title': 'XXL'
    }
  ];
  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'radio_1',
      checked: false,
      color: 'success',
      cssclass: 'colorgreen',
    }, 
    {
      id: '2',
      name: 'radio_list',
      value: 'radio_2',
      checked: true,
      color: 'warning',
      cssclass: 'coloryellow',
    }, 
    {
      id: '3',
      name: 'radio_list',
      value: 'radio_3',
      checked: false,
      color: 'danger',
      cssclass: 'colorred',
    },
    {
      id: '4',
      name: 'radio_list',
      value: 'radio_4',
      checked: false,
      color: 'primary',
      cssclass: 'colorblue',
    },
    {
      id: '5',
      name: 'radio_list',
      value: 'radio_5',
      checked: false,
      color: 'secondary',
      cssclass: 'colorprimary',
    },
  ];

 constructor(private route: ActivatedRoute, private router: Router, private location: Location) { }

 // fetch the data from productlist page
  ngOnInit() {
    this.selectQuality =  "1";
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.fetchItem = JSON.parse(params.special);
        console.log(this.fetchItem);
        this.pageTitle = this.fetchItem['ItemName'];
        this.viewImage = this.fetchItem['Itemimg'];
        this.itemPrice = this.fetchItem['itemPrice'];
        this.diductprice = this.fetchItem['diductprice']
      }
    });
  }
  goPreviousPage(){
    this.location.back();
  }
  // toogle for favourite product
  toggleLiked(card: any) {
    console.log(card);
    if (this.iconHeart === 'heart') {
      this.iconHeart = 'heart-outline';
      this.buttonColor = '#000';
    } else {
      this.iconHeart = 'heart';
      this.buttonColor = 'red';
    }
  }
  // select the size of product
  SelectClicked(act, i){
    this.selectedIndex = i;
    console.log(act);
  }
  companyFormSelected(ev){
    console.log(typeof(ev));
  }
  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
  }
  // change event for radio button select
  radioSelect(event) {
    console.log("radioSelect", event.detail);
    this.selectedRadioItem = event.detail;
  }

}
