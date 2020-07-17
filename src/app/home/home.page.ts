import { Component, OnInit } from '@angular/core';
import datatable from '../data.json';
import { Router} from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  Users: any = datatable;
  pictureSlides:any= [];
  slideOpt = {
    loop: true,
    autoplay:true
  };
  constructor(private router: Router) { }

  // pictureslides get all the data from json file for sildes
  ngOnInit() {
    this.pictureSlides = this.Users.employees;
  }
  // function to go signup page
  goSignUP(){
    this.router.navigate(['/signup']);

  }

}
