import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NavParams} from 'ionic-angular';
import { ItemDescription } from '../ItemDescription/ItemDescription';

@Component({
  selector: 'page-ItemListing',
  templateUrl: 'ItemListing.html'
})
export class ItemListing {
  
  items:any;
  constructor(public navCtrl: NavController, public params:NavParams, public loadingCtrl: LoadingController) {
      this.items = params.get('res');
      //console.log(this.items);
  }


  details(Id,MainCatID,SubCatID,BrandID){

  	let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait ...'
    });
    loadingPopup.present();

	localStorage.setItem('Id',Id);
  	localStorage.setItem('MainCatID',MainCatID);
  	localStorage.setItem('SubCatID',SubCatID);
  	localStorage.setItem('BrandID',BrandID);
  	
  	
  	this.navCtrl.push(ItemDescription);

	loadingPopup.dismiss();

  }






}//end of Component
