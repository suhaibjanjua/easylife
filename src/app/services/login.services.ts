import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class LoginServices {
	
	http : any;
	autorization : any;

	constructor(http: Http){
		this.http = http;
	}

	login(Email, Password,SocialMedia){
		this.autorization =  { Email: Email, Password: Password, SocialMedia: SocialMedia};
		return this.http.get('http://api.easylifeglobal.com/ELG/ValidateCustomer', { headers: this.autorization})
		.map(res => res.json());
	}

}