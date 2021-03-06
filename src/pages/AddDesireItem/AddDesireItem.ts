
import { Component} from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-AddDesireItem',
  templateUrl: 'AddDesireItem.html'
})
export class AddDesireItem {
  
  
  constructor(
     public navCtrl: NavController,
     public params:NavParams, 
     public Dashboardservices:dashboardservices, 
     private toastCtrl: ToastController, 
     public loadingCtrl: LoadingController
    ) {
     
  }

  mainCats:any;
  mainCatsId:any;
  brands:any;
  displayfile:any;
  displayfileName:any;
  brandsItemId:any;
  description = "";
  title = "";
  userid = localStorage.getItem('Id');

  login(){
    this.navCtrl.push(LoginPage);
  }

  ngOnInit(){

    if (localStorage.getItem('Id')=='') {
      
       let loadingPopup = this.loadingCtrl.create({
         content: 'Please Wait ...'
      });

      loadingPopup.present();
       this.navCtrl.push(LoginPage);
       loadingPopup.dismiss();

   }else{
    
        let loadingPopup = this.loadingCtrl.create({
          content: 'Please Wait ...'
       });

       loadingPopup.present();

      this.Dashboardservices.get_main_Catogries().subscribe(res =>{
        
        this.mainCats = res.Details;
        console.log(res);

        loadingPopup.dismiss();
      });
    }
  }

  getBrand($event){
    this.mainCatsId = $event;

     let loadingPopup = this.loadingCtrl.create({
        content: 'Please Wait ...'
     });

     loadingPopup.present();

    this.Dashboardservices.Get_Sub_Category(this.mainCatsId).subscribe(res =>{
         this.brands = res.Details;
        console.log(res);
         loadingPopup.dismiss();
    });
  }

  getBranditems($event){
    this.brandsItemId = $event;
  }

  displayFile($event){
    var inputValue = $event.target;
     if( null == inputValue || null == inputValue.files[0]){
       console.log("Input file error.");
       return;
     }else {
       this.displayfile = inputValue.files[0];
         this.displayfileName = this.displayfile.name;
     }
   }

   addDesireItem(){
    
        var formData = new FormData();
        formData.append('brandImage', this.displayfile, this.displayfileName);
    
              let loadingPopup = this.loadingCtrl.create({
                content: 'Uploading Ad...'
             });
    
             loadingPopup.present();
    
          
          this.Dashboardservices.addDesireItem(formData, 
            this.mainCatsId,
            this.brandsItemId,
            this.title,
            this.description).subscribe(res =>{
    
                loadingPopup.dismiss();
            if (res.ResponseCode == 200) {

              let alert = this.toastCtrl.create({
                    message: 'Item Successfully added',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();
              }else{

                 let alert = this.toastCtrl.create({
                    message: 'Something Went Wrong ! Item not added',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();
              }
    
            }); 
      } 

}//end of Component
