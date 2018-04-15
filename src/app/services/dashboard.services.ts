import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class dashboardservices {
	
	http : any;
	autorization : any;

	constructor(http: Http){
		this.http = http;
	}

	get_main_Catogries(){
		return this.http.get('http://api.easylifeglobal.com/ELG/GetMainCategory')
		.map(res => res.json());
	}

	Get_Sub_Category(mainCatid){
		this.autorization =  { MainCategoryID: mainCatid};
		return this.http.get('http://api.easylifeglobal.com/ELG/GetSubCategory', { headers: this.autorization})
		.map(res => res.json());
	}

	Get_Brand(subCatid){
		this.autorization =  { SubCategoryID: subCatid};
		return this.http.get('http://api.easylifeglobal.com/ELG/GetBrand', { headers: this.autorization})
		.map(res => res.json());
	}

	submitadpost(formData, MainCatID, SubCatID, 
		BrandID, Name, Description, Price, AdditionalInformation, PostedByUserID,DisplayImage){

		var userid = +PostedByUserID;

		this.autorization =  { 
			MainCatID : MainCatID, 
			SubCat1ID : SubCatID, 
			BrandID: BrandID, 
			Name: Name, 
			Description: Description, 
			Price:Price, 
			AddionalInfo: AdditionalInformation,
			PostedByUserID:userid,
			DisplayImage: 'EasyLifePostImage'
		};

		/*console.log(formData + ' ' +MainCatID + ' ' + SubCatID + ' ' + BrandID + ' ' +Name + ' ' +Description
			+ ' ' +Price+ ' ' +AdditionalInformation+ ' ' +PostedByUserID+ ' ' +DisplayImage);*/
		
		return this.http.post('http://api.easylifeglobal.com/ELG/PostAd', formData,{ headers: this.autorization})
		.map(res => res.json());
		
	}

	addDesireItem(formData, MainCatID, SubCatID, Name, Description){

		this.autorization =  { 
			MainCatID : MainCatID, 
			SubCat1ID : SubCatID, 
			Name: Name, 
			Description: Description,
		};
		
		return this.http.post('http://api.easylifeglobal.com/ELG/AddBrand', formData,{ headers: this.autorization})
		.map(res => res.json());
		
	}

	add_brand(formData, MainCatID, Name, Description){

		this.autorization =  { 
			MainCatID : MainCatID,
			Name: Name, 
			Description: Description
		};
		
		return this.http.post('http://api.easylifeglobal.com/ELG/AddSubCat', formData,{ headers: this.autorization})
		.map(res => res.json());
	}


	my_ads(user_id){
		this.autorization =  { PostedByUserID: user_id};
		return this.http.get('http://api.easylifeglobal.com/ELG/GetPosts_User', { headers: this.autorization})
		.map(res => res.json());
	}

	delete_Ad(postid){
		this.autorization =  { PostID: postid};
		return this.http.get('http://api.easylifeglobal.com/ELG/DeletePost', { headers: this.autorization})
		.map(res => res.json());
	}


	search_Ad(MainCatID, SubCat1ID, BrandID,CountryID, CityID,Name,Price,PriceTwo){

		this.autorization =  { MainCatID: MainCatID, SubCat1ID: SubCat1ID, BrandID: BrandID, CityID: CityID,CountryID: CountryID,Name:Name, Price:Price, PriceTwo: PriceTwo  };
		return this.http.get('http://api.easylifeglobal.com/ELG/SearchAd', { headers: this.autorization})
		.map(res => res.json());

	}
}
