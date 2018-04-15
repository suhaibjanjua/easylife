import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { NavParams} from 'ionic-angular';
import { myad } from '../myad/myad';

@Component({
  selector: 'page-myad_details',
  templateUrl: 'myad_details.html'
})
export class myad_details {
  
  items:any;
  itemId:any;
  currentitemDetails:any;

  constructor(
		public navCtrl: NavController,  
		public params:NavParams, 
		private Dashboardservices:dashboardservices, 
		private alertCtrl: AlertController, 
		public loadingCtrl: LoadingController) {
     this.items = params.get('res');
	 this.itemId = localStorage.getItem('itemId');
	 

     for (let i = 0; i < this.items.length; ++i) {
     	
     	if (this.items[i].Id == this.itemId) {
     		this.currentitemDetails = this.items[i];
     	}
     }     
  }

  deleteAd(postid){

    let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait ...'
    });
    

    let alert = this.alertCtrl.create({
					    title: 'Your Ad',
					    subTitle: 'Are You Sure? Delete this Ad',
					   buttons: [
							        {
							          text: 'Yes',
							          handler: () => {
							          	loadingPopup.present();
							              this.Dashboardservices.delete_Ad(postid).subscribe(res =>{
											      //console.log(res);
											      loadingPopup.dismiss();

											      if (res.ResponseCode == 200) {

											             this.navCtrl.setRoot(myad);
											         }
											     });
							          }
							        },
							        {
							          text: 'No',
							          handler: () => {
							          }
							        }
							      ]
					  });
             alert.present();
}

}//end of Component
