import { Component} from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { forgotpasswordServices } from '../../app/services/forgotpassword.services';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class changepassword {
  
  constructor(public navCtrl: NavController,
   private alertCtrl: AlertController, 
   private ForgotpasswordServices:forgotpasswordServices, 
   private toastCtrl: ToastController, 
   public loadingCtrl: LoadingController) {}

  oldPassword = "";
  newPassword = "";
  confirmPassword = "";
 	pass = "";
  Id = "";
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
          this.pass = localStorage.getItem('Password');
          this.Id = localStorage.getItem('Id');
        }
         
      }

  		changePassword(){

        let loadingPopup = this.loadingCtrl.create({
            content: 'Please Wait ...'
          });

         loadingPopup.present();

        if (this.newPassword == ""){

           let alert = this.toastCtrl.create({
                    message: 'Field Missing ! Please Enter New Password.',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();
            
            loadingPopup.dismiss();

        }else if(this.pass == this.oldPassword) {

          if(this.confirmPassword === this.newPassword){

            this.ForgotpasswordServices.ChangePassword(this.Id,this.newPassword).subscribe(res =>{
              loadingPopup.dismiss();
              //console.log(res)
                if(res.ResponseCode == '401'){

                  let alert = this.toastCtrl.create({
                    message: res.ResponseDescription,
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();


                }else if(res.ResponseCode == '200') {
                   
                  let alert = this.alertCtrl.create({
                    title: 'Password',
                    message: 'Your Password Successfully Changed',
                    buttons: [
                      {
                        text: 'Done',
                        handler: () => {
                           localStorage.setItem('Id', '');
                              localStorage.setItem('Email', '');
                              localStorage.setItem('Password', '');
                              this.navCtrl.setRoot(LoginPage);
                        }
                      }
                    ]
                  });
                  alert.present();
                }
              });
            }else{
              let alert = this.toastCtrl.create({
                    message: 'Password Not Matched',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();
              loadingPopup.dismiss();
            }    
           
        }else{
           loadingPopup.dismiss();
           let alert = this.toastCtrl.create({
                    message: 'Enter Your Old Password',
                    duration: 3000,
                    position: 'bottom',
                  });
                  alert.present();
            alert.present();

        }
  			
  		}

}
