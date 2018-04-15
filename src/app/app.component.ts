import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServices } from './services/login.services';
import { SignupServices } from './services/signup.services';
import { forgotpasswordServices } from './services/forgotpassword.services';
import { dashboardservices } from './services/dashboard.services';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { changepassword } from '../pages/changepassword/changepassword';
import { TabsPage } from '../pages/tabs/tabs';
import { AddDesireItem } from '../pages/AddDesireItem/AddDesireItem';
import { AddDesireBrand } from '../pages/AddDesireBrand/AddDesireBrand';

@Component({
  templateUrl: 'app.html',
  selector: 'page-app',
  providers: [LoginServices, SignupServices, forgotpasswordServices, dashboardservices]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  user_email:any;
  pages: Array<{title: string, component: any}>;
  
  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public loadingCtrl: LoadingController,
              public splashScreen: SplashScreen,
              public googlePlus: GooglePlus,
              public facebook: Facebook
            ) {
    this.initializeApp();
    this.user_email = localStorage.getItem('Email');
    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Change Password', component: changepassword },
      { title: 'Add Desire Brand', component: AddDesireBrand },
      { title: 'Add Desire Item', component: AddDesireItem }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  

  ngOnInit() {
    this.user_email = localStorage.getItem('Email');
  }

  ad(){
    this.nav.setRoot(TabsPage);
  }

  Login(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

     this.googlePlus.logout().then(function (response) {
    });

    this.facebook.logout().then((response) => {
    });

     loading.dismiss();

     this.nav.push(LoginPage);
  }

  Logout(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    localStorage.setItem('Id', '');
    localStorage.setItem('Email', '');
    localStorage.setItem('Password', '');

    this.googlePlus.logout().then(function (response) {
    });

    this.facebook.logout().then((response) => {
    });

    loading.dismiss();
      this.nav.setRoot(LoginPage);
  }
  
}
