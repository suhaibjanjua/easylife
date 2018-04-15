import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NavParams} from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';


@Component({
  selector: 'page-ItemDescription',
  templateUrl: 'ItemDescription.html'
})
export class ItemDescription {
 
  constructor(public navCtrl: NavController,  private Dashboardservices:dashboardservices,
    public params:NavParams, public loadingCtrl: LoadingController) {

  }

  info = "Description";


    Id = localStorage.getItem('Id');
    MainCatID = localStorage.getItem('MainCatID');
    SubCatID = localStorage.getItem('SubCatID');
    BrandID = localStorage.getItem('BrandID');
    items:any;
    currentitemDetails:any;

     ngOnInit(){
       
       let loadingPopup = this.loadingCtrl.create({
         content: 'Please Wait ...'
       });
       loadingPopup.present();

       this.Dashboardservices.search_Ad(this.MainCatID,this.SubCatID,this.BrandID,'','','','','').subscribe(res =>{
         console.log(res);
         loadingPopup.dismiss();
         this.items = res.Details;

           for (let i = 0; i < this.items.length; ++i) {
             if (this.items[i].Id == this.Id) {
               this.currentitemDetails = this.items[i];
               //console.log(this.currentitemDetails.Name);
             }
           }  

       });
     }

}//end of Component
