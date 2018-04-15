import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginServices } from '../../app/services/login.services';
import { signup } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { forgotpassword } from '../forgotpassword/forgotpassword';
import { MyApp } from '../../app/app.component';
import { signupFB } from './../signupFB/signupFB';
import { signupGM } from './../signupGM/signupGM';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    constructor(public navCtrl: NavController,
        private loginServices: LoginServices,
        public loadingCtrl: LoadingController,
        public facebook: Facebook,
        private toastCtrl: ToastController,
        public googlePlus: GooglePlus
    ) { }
    Email = "";
    Password = "";
    userData: any;
    Login() {
        let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
        });
        loadingPopup.present();
        this.loginServices.login(this.Email, this.Password, "None").subscribe(res => {
            // console.log(res);
            if (res.ResponseCode == 401) {
                //console.log(res.ResponseDescription);

                let alert = this.toastCtrl.create({
                    message: 'Login Failed We didnt recognize you ! Please Signup if you dont have an account.',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();


                loadingPopup.dismiss();
            } else if (res.ResponseCode == 500) {
                let alert = this.toastCtrl.create({
                    message: 'Login Failed ! We have Some Technical Issue',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();

                loadingPopup.dismiss();
            } else {
                localStorage.setItem('Id', res.Details[0].Id);
                localStorage.setItem('Email', res.Details[0].Email);
                localStorage.setItem('Password', this.Password);
                this.navCtrl.setRoot(TabsPage);
                loadingPopup.dismiss();
                location.reload();
            }
        });
    }
    //login with facebook
    facebookemail: any;
    loginWithFB() {
        this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
            this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = { email: profile['email'], id: profile['id'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
                //alert(this.userData.email);
                let loadingPopup = this.loadingCtrl.create({
                    content: 'Please Wait ...'
                });
                this.facebookemail = this.userData.id + "@facebook.com";
                loadingPopup.present();
                this.loginServices.login(this.facebookemail, this.userData.id, 'Facebook').subscribe(res => {
                    if (res.ResponseCode == 401) {

                        let alert = this.toastCtrl.create({
                            message: 'Login Failed We didnt recognize you ! Please Signup if you dont have an account. Or You Dont have a valid account when login with Facebook',
                            duration: 3000,
                            position: 'bottom',
                          });
                          alert.present();
    
                        loadingPopup.dismiss();
                    } else {
                        localStorage.setItem('Id', this.userData.id);
                        localStorage.setItem('Email', this.facebookemail);
                        localStorage.setItem('Password', this.userData.id);
                        this.navCtrl.setRoot(MyApp);
                        loadingPopup.dismiss();
                        location.reload();
                    }
                });
            });
        });
    }
    gmailData: any;
    loginWithGmail() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.googlePlus.login({
            'webClientId': '809541199204-n3ga0no8a7d6qkoagmd0nvk7ml9babal.apps.googleusercontent.com'
        }).then((user) => {
            loading.dismiss();
            this.gmailData = { id: user.userId, email: user.email, name: user.displayName, picture: user.imageUrl };
            let loadingPopup = this.loadingCtrl.create({
                content: 'Please Wait ...'
            });
            loadingPopup.present();
            this.loginServices.login(this.gmailData.email, this.gmailData.id, 'Google').subscribe(res => {
                if (res.ResponseCode == 401) {


                    let alert = this.toastCtrl.create({
                        message: 'Login Failed We didnt recognize you ! Please Signup if you dont have an account. Or You Dont have a valid email when login with Gmail',
                        duration: 3000,
                        position: 'bottom',
                      });
                      alert.present();

                    loadingPopup.dismiss();
                } else {
                    localStorage.setItem('Id', this.gmailData.id);
                    localStorage.setItem('Email', this.gmailData.email);
                    localStorage.setItem('Password', this.gmailData.id);
                    this.navCtrl.setRoot(MyApp);
                    loadingPopup.dismiss();
                    location.reload();
                }
            });
        });
    }
    GoToSignup() {
        this.navCtrl.push(signup);
    }
    //signup with facebook
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
    GoToForgotpassword() {
        this.navCtrl.push(forgotpassword);
    }
}