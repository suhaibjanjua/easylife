import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavParams} from 'ionic-angular';

@Component({
  selector: 'page-searchad_details',
  templateUrl: 'searchad_details.html'
})
export class searchad_details {
  
  items:any;

  constructor( 
    public params: NavParams,
    public loadingCtrl: LoadingController) {

		let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait ...'
    });
		loadingPopup.present();
		
		 this.items = params.get('res');  

		 loadingPopup.dismiss(); 
		 
  }


}//end of Component
