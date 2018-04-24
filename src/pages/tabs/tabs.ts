import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { myad } from '../myad/myad';
import { submitad } from '../submitad/submitad';

@Component({
  templateUrl: 'tabs.html'
})


export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = myad;
  tab3Root: any = submitad;
  tab4Root: any = myad;
  user_email:any;
  constructor() {
   this.user_email = localStorage.getItem('Email');
  }

  	 ngOnInit(){
  	 	this.user_email = localStorage.getItem('Email');
  	 }
}
