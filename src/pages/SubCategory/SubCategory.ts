import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { NavParams} from 'ionic-angular';
import { brand } from '../brand/brand';


@Component({
  selector: 'page-SubCategory',
  templateUrl: 'SubCategory.html'
})
export class SubCategory {
   items:any;
   mainCat:any;
  constructor(
	  public navCtrl: NavController, 
	  public params:NavParams, 
	  private DashboardServices:dashboardservices, 
	  public loadingCtrl: LoadingController) {
  	this.items = params.get('res');
  	//console.log(this.items);
  	this.mainCat =  localStorage.getItem('mainCatname');
  }

  getBrand(Id,Name){
  	let loadingPopup = this.loadingCtrl.create({
  		content: 'Please Wait ...'
  	});
  	loadingPopup.present();

  	this.DashboardServices.Get_Brand(Id).subscribe(res =>{
  		//console.log(res);
  		loadingPopup.dismiss();
  		localStorage.setItem('subCatname', Name);
  		this.navCtrl.push(brand,{
              res:res.Details
          });
  	});
  }

 

   

    
}
