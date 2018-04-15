import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class SignupServices {
	
	http : any;
	autorization : any;

	constructor(http: Http){
		this.http = http;
	}

	getCountries(){
		return this.http.get('http://api.easylifeglobal.com/ELG/GetCountry')
		.map(res => res.json());
	}

	getCities(countryCode){
		this.autorization =  { 'CountryID': countryCode };
		return this.http.get('http://api.easylifeglobal.com/ELG/GetCity', { headers: this.autorization})
		.map(res => res.json());
	}

	signup(countryCode, cityCode, Email, Firstname, Lastname, Password, Phone, SocialMedia){
		this.autorization =  { 'Email':Email,'Password':Password,'FirstName':Firstname,'LastName':Lastname,'Phone':Phone,'CountryID':countryCode,'CityID':cityCode, SocialMedia:SocialMedia};
		return this.http.get('http://api.easylifeglobal.com/ELG/RegisterUser', { headers: this.autorization})
		.map(res => res.json());
	}

}