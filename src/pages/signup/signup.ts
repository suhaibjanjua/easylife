

import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SignupServices } from '../../app/services/signup.services';
import { LoginPage } from '../login/login';
import { signupFB } from './../signupFB/signupFB';
import { signupGM } from './../signupGM/signupGM';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class signup {

  constructor(public navCtrl: NavController,
    private signupServices: SignupServices,
    private alertCtrl: AlertController,
     private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public facebook: Facebook,
    public googlePlus: GooglePlus
  ) { }

  countries: any;
  cities: any;
  Email = "";
  Password = "";
  countryCode = "";
  cityCode = "";
  Firstname = "";
  Lastname = "";
  Phone = "";
  ConfirmPassword = "";
  SocialMedia = "None";

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

    var atpos = this.Email.indexOf("@");
    var dotpos = this.Email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= this.Email.length) {


                let alert = this.toastCtrl.create({
                    message: 'Invalid Email ! Please Enter Valid Email Address.',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();

    }
    else if (this.Password === this.ConfirmPassword) {

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


          this.Email = "";
          this.Password = "";
          this.Firstname = "";
          this.Lastname = "";
          this.Phone = "";
          this.ConfirmPassword = "";

        } else {

           let alert = this.toastCtrl.create({
                    message: 'Field Missing ! Please Fill Out all the fields',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();

        }
      });
    } else {
     

      let alert = this.toastCtrl.create({
                    message: 'Password Mismatch !',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();
    }


  }


  userDataFB: any;
  fbemail: any;
  signupWithFb() {
     
    this.facebook.logout().then((response) => {
    });

    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id, name, email, first_name, last_name, picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userDataFB = {
          email: profile['email'],
          id: profile['id'],
          first_name: profile['first_name'],
          last_name: profile['last_name'],
          picture: profile['picture_large']['data']['url'],
          username: profile['name']
        };
        let loadingPopup = this.loadingCtrl.create({
          content: 'Please Wait ...'
        });

        loadingPopup.present();
        this.fbemail = this.userDataFB.id + "@facebook.com";
        localStorage.setItem('fb_Id', this.userDataFB.id);
        localStorage.setItem('fb_Email', this.fbemail);
        localStorage.setItem('fb_first_name', this.userDataFB.first_name);
        localStorage.setItem('fb_last_name', this.userDataFB.last_name);
        this.navCtrl.push(signupFB);
        loadingPopup.dismiss();
      })
    });
  }
  gmData: any;
  first_name: any;
  last_name: any;
  full_name: any;
  full_name_split: any;

  signupWithGM() {
    this.googlePlus.logout().then(function (response) { });
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    if (localStorage.getItem('Email') != "") {
      this.googlePlus.logout()
        .then(function (response) {
        });
    }

    this.googlePlus.login({
      'webClientId': '809541199204-n3ga0no8a7d6qkoagmd0nvk7ml9babal.apps.googleusercontent.com'
    }).then((user) => {
      loading.dismiss();

      this.gmData = { id: user.userId, email: user.email, name: user.displayName, picture: user.imageUrl };

      let loadingPopup = this.loadingCtrl.create({
        content: 'Please Wait ...'
      });
      loadingPopup.present();

      this.full_name = this.gmData.name;
      this.full_name_split = this.full_name.split(" ");
      this.first_name = this.full_name_split[0];
      this.last_name = this.full_name_split[1];

      localStorage.setItem('gm_Id', this.gmData.id);
      localStorage.setItem('gm_Email', this.gmData.email);
      localStorage.setItem('gm_first_name', this.first_name);
      localStorage.setItem('gm_last_name', this.last_name);

      loadingPopup.dismiss();
      this.navCtrl.push(signupGM);

    });
  }


  GoToLogin() {
    this.navCtrl.push(LoginPage);
  }
}
