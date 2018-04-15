import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { myad_details } from '../myad_details/myad_details';

@Component({
  selector: 'page-myad',
  templateUrl: 'myad.html'
})
export class myad {
  
  
  constructor(
    public navCtrl: NavController, 
    public params:NavParams, 
    public Dashboardservices:dashboardservices, 
    public loadingCtrl: LoadingController) {
     
  }

  items:any;

  ngOnInit(){

     if (localStorage.getItem('Id')=='') {
         
          let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();
          this.navCtrl.setRoot(LoginPage);
          loadingPopup.dismiss();

      }else{

         let loadingPopup = this.loadingCtrl.create({
          content: 'Please Wait ...'
        });
        loadingPopup.present();

          var user_id = localStorage.getItem('Id');
          
          var current_user = +user_id;
          this.Dashboardservices.my_ads(current_user).subscribe(res =>{
             // console.log(res);
              this.items = res.Details;
              loadingPopup.dismiss();
            });
        }
  }

   details(itemId){

    let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait ...'
    });
    loadingPopup.present();

    var user_id = localStorage.getItem('Id');
    var current_user = +user_id;
    localStorage.setItem('itemId',itemId);

    this.Dashboardservices.my_ads(current_user).subscribe(res =>{
      //console.log(res);
      loadingPopup.dismiss();
      
      this.navCtrl.push(myad_details,{
              res:res.Details
          });
    });
  }




}//end of Component
