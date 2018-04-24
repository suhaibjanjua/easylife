
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { signup } from '../pages/signup/signup';
import { forgotpassword } from '../pages/forgotpassword/forgotpassword';
import { changepassword } from '../pages/changepassword/changepassword';
import { TabsPage } from '../pages/tabs/tabs';
import { SubCategory } from '../pages/SubCategory/SubCategory';
import { brand } from '../pages/brand/brand';
import { submitad } from '../pages/submitad/submitad';
import { myad } from '../pages/myad/myad';
import { myad_details } from '../pages/myad_details/myad_details';
import { searchad } from '../pages/searchad/searchad';
import { searchads } from '../pages/searchads/searchads';
import { searchad_details } from '../pages/searchad_details/searchad_details';
import { AddDesireItem } from '../pages/AddDesireItem/AddDesireItem';
import { signupFB } from './../pages/signupFB/signupFB';
import { signupGM } from './../pages/signupGM/signupGM';
import { ItemListing } from './../pages/ItemListing/ItemListing';
import { ItemDescription } from './../pages/ItemDescription/ItemDescription';
import { AddDesireBrand } from './../pages/AddDesireBrand/AddDesireBrand';


@NgModule({
  declarations: [
    MyApp, TabsPage, HomePage, ListPage, LoginPage, signup, forgotpassword, changepassword, SubCategory,
    brand, submitad, myad, myad_details, searchad, AddDesireItem, searchads, searchad_details, signupFB,signupGM,
    ItemListing, ItemDescription, AddDesireBrand
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, TabsPage, HomePage, ListPage, LoginPage, signup, forgotpassword, changepassword, SubCategory,
    brand, submitad, myad, myad_details, searchad, AddDesireItem, searchads, searchad_details, signupFB, signupGM,
    ItemListing, ItemDescription, AddDesireBrand
  ],
  providers: [
    StatusBar, SplashScreen, Camera, Facebook, GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
