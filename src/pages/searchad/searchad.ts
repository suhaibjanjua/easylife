import { Component} from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { Http } from '@angular/http';
import { SignupServices } from '../../app/services/signup.services';
import { searchads } from '../searchads/searchads';

@Component({
  selector: 'page-searchad',
  templateUrl: 'searchad.html'
})
export class searchad {
  
  http : any;
  autorization : any;

  constructor(
    public navCtrl: NavController,
    http: Http,
    private signupServices:SignupServices, 
    private Dashboardservices:dashboardservices, 
    private alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {
  }

   

  
  mainCats:any;
  brands:any;
  brandsItems:any;

  mainCatsId:any;
  brandsItemId:any;
  ItemId:any;

   countries : any;
  cities : any;
   countryCode = "";
  cityCode = "";

  searchText = localStorage.getItem('searchText');
  title = "";
  itemname = "";

  selectedmainCat = "" ;
  selectedmainCatid = "" ;

  selectedsubCat = "" ;
  selectedsubCatid = "" ;

  selectedbrand = "" ;
  selectedbrandid = "" ;

  selectedcountry = "" ;
  selectedcountryId = "" ;

  selectedcity = "" ;
  selectedcityId = "" ;

  PriceTwo = "50000"
  Price = "5";


  ngOnInit(){
        let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();


        this.Dashboardservices.get_main_Catogries().subscribe(res =>{
        	          this.mainCats = res.Details;

                    this.selectedmainCat = res.Details[0].Name;
                    this.selectedmainCatid = res.Details[0].Id;
                    // this.mainCatsId =  this.selectedmainCatid;

                    this.Dashboardservices.Get_Sub_Category(this.selectedmainCatid).subscribe(res =>{
                     this.brands = res.Details;
                     this.selectedsubCat = res.Details[0].Name;
                     this.selectedsubCatid = res.Details[0].Id;
                    // this.brandsItemId = this.selectedsubCatid;
                     
                           this.Dashboardservices.Get_Brand(this.selectedsubCatid).subscribe(res =>{
                         this.brandsItems = res.Details;
                           this.selectedbrand = res.Details[0].Name;
                           this.selectedbrandid = res.Details[0].Id;

                           // this.ItemId = this.selectedbrandid;
          
                           this.signupServices.getCountries().subscribe(res =>{
                            this.countries = res.Details;
                            
                              this.selectedcountry = res.Details[0].Name;
                              this.selectedcountryId = res.Details[0].Id;
                              
                              //this.countryCode = this.selectedcountryId;
                             

                               this.signupServices.getCities(this.selectedcountryId).subscribe(res =>{
                                 this.cities = res.Details;

                                   this.selectedcity = res.Details[0].Name;
                                   this.selectedcityId = res.Details[0].Id;

                                   //this.cityCode = this.selectedcityId;

                                   loadingPopup.dismiss();
                            });



                          });
                         
                    });
                  });
                    
                    
                  
                 
                   
        });

       
      }

       CountryCode($event){
        this.countryCode = $event;

         let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();

        this.signupServices.getCities(this.countryCode).subscribe(res =>{
             this.cities = res.Details;
             loadingPopup.dismiss();
        });
      }

       CityCode($event){
        this.cityCode = $event;
        //console.log(this.cityCode);
      }

      all = "";

       //sub cat
       getBrand($event){
        this.mainCatsId = $event;
        console.log(this.mainCatsId);

         let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();

        this.Dashboardservices.Get_Sub_Category(this.mainCatsId).subscribe(res =>{
             this.brands = res.Details;
             //console.log(this.brands);
             loadingPopup.dismiss();
        });
      }

      //brands

      getBranditems($event){
        this.brandsItemId = $event;

         let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();

        this.Dashboardservices.Get_Brand(this.brandsItemId).subscribe(res =>{
             this.brandsItems = res.Details;
             //console.log(this.brandsItems);
             loadingPopup.dismiss();
        });
      }

       getitems($event){
        this.ItemId = $event;
        //alert(this.ItemId);
      }

      search_ad(){

         let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();

        this.Dashboardservices.search_Ad(this.mainCatsId,this.brandsItemId,this.ItemId,this.countryCode,this.cityCode,this.searchText,this.Price, this.PriceTwo).subscribe(res =>{
             loadingPopup.dismiss();
             console.log(res);
             if (res.Details.length == 0) {
                let alert = this.alertCtrl.create({
                  title: 'Search Ad',
                  subTitle: 'Ad Not Found',
                  buttons: ['Dismiss']
                });
                alert.present();
             }
             else if(res.ResponseCode == 200) {
                    this.navCtrl.push(searchads,{
                      res:res.Details
                  });
               }
               else if (res.ResponseCode == 500) {
                let alert = this.alertCtrl.create({
                    title: 'Search Ad',
                    subTitle: res.ResponseDescription,
                    buttons: ['Dismiss']
                  });
                  alert.present();
             }
              
        });

/*          console.log(this.mainCatsId);
          console.log(this.brandsItemId);
          console.log(this.ItemId);
          console.log(this.countryCode);
          console.log(this.cityCode);
          console.log(this.searchText);
          console.log(this.Price);
*/         
      }


  


}//end of Component

