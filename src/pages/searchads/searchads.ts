import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { NavParams} from 'ionic-angular';
import { searchad_details } from '../searchad_details/searchad_details';

@Component({
  selector: 'page-searchads',
  templateUrl: 'searchads.html'
})
export class searchads {

  
  items:any;
  res:any;
  searchText = localStorage.getItem('searchText');
  constructor(public navCtrl: NavController, 
    public params:NavParams,
    public Dashboardservices:dashboardservices,
    public loadingCtrl: LoadingController) {
     
      this.res = params.get('res');
      //console.log(this.res);
  }


  ngOnInit(){

  }

  details(r){

    let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait ...'
    });
    loadingPopup.present();

      this.navCtrl.push(searchad_details,{
              res: r 
          });

          loadingPopup.dismiss();

  }




}//end of Component
