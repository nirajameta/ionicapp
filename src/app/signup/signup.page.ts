import { Component, OnInit, ViewChild} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router} from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public RegistrationForm: FormGroup;
  public loginForm: FormGroup;
  isSubmitted = false;
  user:any;
  variableIcon: boolean = false;
  registrationData:any;
  password_type: string = 'password';
  @ViewChild('slides') slides: IonSlides;


  constructor(public formBuilder: FormBuilder, public toastController: ToastController, private router: Router, private ionLoader: LoaderService, public menuCtrl: MenuController) {}
  
  // created form config for registration and loginform
  ngOnInit() {
    this.RegistrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  // remove side menu on login page
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
   // function for slide change
  async slideChanged() {
    await this.slides.getActiveIndex().then((index)=> {
    });
  }
  // function for toogle the type for password
  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
    this.variableIcon = !this.variableIcon
  }
  // function for go to next slide
  nextSlide(){
    this.slides.slideNext();
  }
  // function for go to previous slide
  previousSlide(){
    this.slides.slidePrev();
  }
  get errorControl() {
    return this.RegistrationForm.controls;
  }
  // Common function for toast
  async displayToast(msg, duration, position) {
    let toast = await this.toastController.create({
      message: msg,
      duration: duration,
      position: position,
      cssClass: "textaligntoast"
    });
    toast.present();
  }
  // function call after click on submit login form
   loginFormSubmit(){
    this.user = JSON.parse(localStorage.getItem('registerdata'));
    console.log(this.user);
    console.log(this.loginForm.value);
    if (this.user === null || this.user === undefined) {
      this.displayToast('Please Register before Login', 3000, 'top');
    }
    if((this.loginForm.value.email == this.user.name || this.loginForm.value.email == this.user.email ) &&  this.loginForm.value.password == this.user.password) {
      this.ionLoader.showLoader();

      setTimeout(() => {
        this.hideLoader();
      }, 2000);
      this.router.navigate(['/tabs']);
    }
    else {
      this.displayToast('Either Username or Password is wrong', 5000, 'bottom');
    }
  }
  // function for display loader
  showLoader() {
    this.ionLoader.showLoader();

    setTimeout(() => {
      this.hideLoader();
    }, 2000);
  }

  hideLoader() {
    this.ionLoader.hideLoader();
  }
  // function call after click on submit registration form
  submitForm() {
    this.isSubmitted = true;
    if (!this.RegistrationForm.valid) {
      return false;
    } else {
      console.log(this.RegistrationForm.value);
      this.registrationData = localStorage.setItem('registerdata', JSON.stringify(this.RegistrationForm.value));
      console.log(localStorage.getItem('registerdata'));
      this.ionLoader.showLoader();
      setTimeout(() => {
        this.hideLoader();
      }, 2000);
      this.presentToast();
      //this.RegistrationForm.reset();
      this.previousSlide();
    }
  }

  presentToast() {
    this.displayToast('You have Registered Successfully in localStorage', 2000, 'bottom');
  }
}
