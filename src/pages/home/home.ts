import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { SubCategory } from '../SubCategory/SubCategory';
import { searchad } from '../searchad/searchad';
import { submitad } from '../submitad/submitad';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
 	 items:any;
   itemName:any;
   searchText = "";

   constructor(public navCtrl: NavController, private DashboardServices:dashboardservices, public loadingCtrl: LoadingController) {
     
   }

   	ngOnInit(){
        
        let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
        });
        
        this.DashboardServices.get_main_Catogries().subscribe(res =>{
            this.items = res.Details;
            loadingPopup.dismiss();
        });
    }
       
       submitadpage(){

          if (localStorage.getItem('Id')=='') {
         
          let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

          loadingPopup.present();
          this.navCtrl.setRoot(LoginPage);
          loadingPopup.dismiss();

      }else{
         this.navCtrl.push(submitad); 
       }
    }

   	GetSubCategory(Id,Name){
        let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
          });

         loadingPopup.present();

   		this.DashboardServices.Get_Sub_Category(Id).subscribe(res =>{
   		   		//console.log(res);
              loadingPopup.dismiss();
          localStorage.setItem('mainCatname', Name);
  				this.navCtrl.push(SubCategory,{
              res:res.Details
          });
  			});
   	}

     searchad(){
       localStorage.setItem('searchText', this.searchText);
       //alert(this.searchText);
       this.navCtrl.push(searchad);
     }

}
