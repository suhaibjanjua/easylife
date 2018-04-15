import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class forgotpasswordServices {
	
	http : any;
	autorization : any;

	constructor(http: Http){
		this.http = http;
	}

	forgotpassword(Email){
		this.autorization =  { 'Email': Email};
		return this.http.get('http://api.easylifeglobal.com/ELG/ForgotPassword', { headers: this.autorization})
		.map(res => res.json());
	}

	ChangePassword(UserID,Password){
		this.autorization =  { 'UserID': UserID, 'Password': Password};
		return this.http.get('http://api.easylifeglobal.com/ELG/ChangePassword', { headers: this.autorization})
		.map(res => res.json());
	}

}