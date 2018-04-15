import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController} from 'ionic-angular';

import { SignupServices } from '../../app/services/signup.services';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-signupGM',
  templateUrl: 'signupGM.html'
})
export class signupGM {
  
  constructor(public navCtrl: NavController, 
              private signupServices: SignupServices, 
              private alertCtrl: AlertController,
              private toastCtrl: ToastController, 
              public loadingCtrl: LoadingController
            ) { }

            countries: any;
            cities: any;
            Email = localStorage.getItem('gm_Email');
            Password = localStorage.getItem('gm_Id');
            countryCode = "";
            cityCode = "";
            Firstname = localStorage.getItem('gm_first_name');
            Lastname = localStorage.getItem('gm_last_name');
            Phone = "";
            SocialMedia = "Google";
  
  ngOnInit() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait ...'
    });

    loadingPopup.present();

    this.signupServices.getCountries().subscribe(res => {
      this.countries = res.Details;
      loadingPopup.dismiss();
    });
  }

  CountryCode($event) {
    this.countryCode = $event;

    let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait ...'
    });

    loadingPopup.present();

    this.signupServices.getCities(this.countryCode).subscribe(res => {
      this.cities = res.Details;
      loadingPopup.dismiss();
    });
  }

  CityCode($event) {
    this.cityCode = $event;
    //console.log(this.cityCode);
  }

  signup() {

    let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait ...'
    });

    loadingPopup.present();

    this.signupServices.signup(this.countryCode, this.cityCode, this.Email, this.Firstname, this.Lastname, this.Password, this.Phone, this.SocialMedia).subscribe(res => {
      //console.log(res);
      loadingPopup.dismiss();

      if (res.ResponseCode == '500') {

        let alert = this.toastCtrl.create({
                    message: 'Registeration Failed ! Internal Server Error',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();


      } else if (res.ResponseCode == '200') {

        let alert = this.alertCtrl.create({
          title: 'Successfull',
          message: 'You are Successfully Register',
          buttons: [
            {
              text: 'Login',
              handler: () => {
                this.navCtrl.push(LoginPage);
              }
            }
          ]
        });
        alert.present();
      } else {

        let alert = this.toastCtrl.create({
                    message: 'Field Missing ! Please Fill Out all the fields',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();

      }
    });
  }

  GoToLogin() {
    this.navCtrl.push(LoginPage);
  }
}
