import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { NavParams} from 'ionic-angular';
import { ItemListing } from '../ItemListing/ItemListing';


@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html'
})
export class brand {
   items:any;
   subCat:any;
  constructor(public navCtrl: NavController, 
    public params:NavParams, 
    private Dashboardservices:dashboardservices,
    public loadingCtrl: LoadingController) {

      this.items = params.get('res');

      //console.log(this.items);
      this.subCat =  localStorage.getItem('subCatname');
  }


  get_ad_Details(MainCategoryId,SubCategoryId,brandId){

    let loadingPopup = this.loadingCtrl.create({
        content: 'Please Wait ...'
     });

     loadingPopup.present();

    this.Dashboardservices.search_Ad(MainCategoryId,SubCategoryId,brandId,'','','','','').subscribe(res =>{
      console.log(res);
      this.navCtrl.push(ItemListing,{
          res:res.Details
      });

      loadingPopup.dismiss();
    });

  }


 

   

    
}
