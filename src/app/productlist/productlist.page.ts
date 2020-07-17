import { Component, OnInit } from '@angular/core';
import datatable from '../data.json';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {Location} from "@angular/common";

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
  data: any;
  itemtitleId: string;
  itemtitleId2: string;
  itemtitle: string;
  dataArray: any;
  catagory: any[];
  category: any;
  Users: any = datatable;
  iconHeart: string = "heart-outline";
  buttonColor: string = '#000';
  constructor(private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    this.dataArray = this.Users.datas;
    this.data = this.route.params.subscribe(params => {
      // receive the id1 and id2 for types of catagory
      this.itemtitleId = params['id']; 
      this.itemtitleId2 = params['id2'];
      console.log('id1', this.itemtitleId);
      console.log('id2', this.itemtitleId2);
      console.log(this.itemtitleId);
    });
    if(this.itemtitleId ==  'Women\'s wear'){
      this.itemtitle = "Women's Wear"
      this.dataArray = this.Users.womendata;
    }
    else if(this.itemtitleId ==  'Men\'s wear'){
      this.itemtitle = "Men's Wear";
      this.dataArray = this.Users.mandata;
    }
    else if(this.itemtitleId ==  'Kids wear'){
      this.itemtitle = "Kids Wear";
      this.dataArray = this.Users.kidsdata;
    }
    if (this.itemtitleId2 == "No"){
      this.category =  this.dataArray[0].ItemType;
    }
    else{
      this.category =  this.itemtitleId2;
      console.log(this.category);
    }
  }
  //changing of segment in click
  segmentChanged(ev: any) {
    console.log(typeof(ev));
    console.log(ev);
  }
  //toggle button for heart for favourite item
  toggleLiked(card: any) {
    console.log(card);
    if (this.iconHeart === 'heart') {
      this.iconHeart = 'heart-outline';
      this.buttonColor = '#000';
    } else {
      this.iconHeart = 'heart';
      this.buttonColor = 'purple';
    }
  }
  //click on item and redirect to next page with items detail
  productView(category1){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(category1)
      }
    };
    this.router.navigate(['/productview'], navigationExtras);
  }
  goCatagory(){
    this.location.back();
  }
  stopClick(event){
    event.stopPropagation();
  }
}
