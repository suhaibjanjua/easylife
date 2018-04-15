import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { forgotpasswordServices } from '../../app/services/forgotpassword.services';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class forgotpassword {
 
  constructor(public navCtrl: NavController, 
    private ForgotpasswordServices:forgotpasswordServices, private alertCtrl: AlertController, public loadingCtrl: LoadingController,
        private toastCtrl: ToastController) {}

  Email = "";
  Password = "";
 	

  		forgotpassword(){

         let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
         });

         loadingPopup.present();

  			this.ForgotpasswordServices.forgotpassword(this.Email).subscribe(res =>{
  				
          loadingPopup.dismiss();
          
  				if(res.ResponseCode == '401'){

  					let alert = this.toastCtrl.create({
                    message: res.ResponseDescription,
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();

  				}else if(res.ResponseCode == '200'){
  				  
  				  let alert = this.alertCtrl.create({
					    title: 'Email Sent',
					    message: 'Please Check Your Email',
					    buttons: [
					      {
					        text: 'Login',
					        handler: () => {
					           this.navCtrl.push(LoginPage);
					        }
					      }
					    ]
					  });
					  alert.present();
  				}



  			});
  		}

  	  GoToLogin(){
        this.navCtrl.push(LoginPage);
      }

}
