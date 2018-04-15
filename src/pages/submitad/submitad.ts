import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { dashboardservices } from '../../app/services/dashboard.services';
import { NavParams} from 'ionic-angular';
import { myad } from '../myad/myad';
import { LoginPage } from '../login/login';
import { Camera } from '@ionic-native/camera';
import { Http } from '@angular/http';

@Component({
  selector: 'page-submitad',
  templateUrl: 'submitad.html'
})
export class submitad {
  
  http : any;
  autorization : any;

  constructor(public navCtrl: NavController,
    http: Http, 
    private camera: Camera, 
    public params:NavParams, 
    private Dashboardservices:dashboardservices, 
    public loadingCtrl: LoadingController) {}

  public base64Image: string;
  mainCats:any;
  brands:any;
  brandsItems:any;

  mainCatsId:any;
  brandsItemId:any;
  ItemId:any;

  price = "";
  additionalinfo = "";
  description = "";
  title = "";



     ngOnInit(){
      
      if (localStorage.getItem('Id')=='') {
         
          let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();
          this.navCtrl.setRoot(LoginPage);
          loadingPopup.dismiss();

      }else{
          let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();

        this.Dashboardservices.get_main_Catogries().subscribe(res =>{
          
          this.mainCats = res.Details;
          //console.log(res);

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
            // console.log(this.brands);
             loadingPopup.dismiss();
        });
      }

      getBranditems($event){
        this.brandsItemId = $event;

         let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();

        this.Dashboardservices.Get_Brand(this.brandsItemId).subscribe(res =>{
             this.brandsItems = res.Details;
            // console.log(this.brandsItems);
             loadingPopup.dismiss();
        });
      }

      getitems($event){
      	this.ItemId = $event;
      	//alert(this.ItemId);
      }

      //finally Submit ad

	 
 takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        //alert(this.base64Image);
    }, (err) => {
        console.log(err);
    });
  }

  displayfile:File;
  otherfile:File;

  otherfilename:any;

  displayfileName:any;
  EasyLifePostImage:any;

  formData = new FormData();

  displayFile($event){
   var inputValue = $event.target;
    if( null == inputValue || null == inputValue.files[0]){
      console.log("Input file error.");
      return;
    }else {
      this.displayfile = inputValue.files[0];
        this.displayfileName = this.displayfile.name;
        this.EasyLifePostImage = 'EasyLifePostImage.'+this.displayfileName.split('.').pop();
        this.formData.append('EasyLifePostImage', this.displayfile, this.EasyLifePostImage);
    }
  }

  otherFile($event){
    
    var inputValue = $event.target;
    if( null == inputValue || null == inputValue.files[0]){
      console.log("Input file error.");
      return;
    }else {
      
      for(let i=0; i<inputValue.files.length; i++){
        this.formData.append('otherImage'+[i], inputValue.files[i]);
      }

    }
  }

  

  adSubmit(){

      let loadingPopup = this.loadingCtrl.create({
         content: 'Uploading Ad...'
      });

         loadingPopup.present();

      
      this.Dashboardservices.submitadpost(this.formData, 
        this.mainCatsId,
        this.brandsItemId,
        this.ItemId, 
        this.title,
        this.description,
        this.price,
        this.additionalinfo,
        localStorage.getItem('Id'),
        this.displayfile).subscribe(res =>{

            loadingPopup.dismiss();
            this.navCtrl.setRoot(myad);
        
            console.log(res);


        });
  } 



}//end of Component
