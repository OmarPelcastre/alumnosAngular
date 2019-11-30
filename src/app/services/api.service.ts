import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

	token;
  	url: string;
	public id;

	constructor(public _http: HttpClient){
		this.url = "http://127.0.0.1:8000/api/v1/"; 
	}

	setId(id){
		this.id = id;
	}

	login(user): Observable<any>{
		
		//let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'rest-auth/login/' , user, {headers: headers});
	}

	create(user: User): Observable<any>{
		let params = JSON.stringify(user);
		// let body = {
		// 	name: user.name,
		// 	email: user.email,
		// 	password: user.password
		//   };
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+ this.getToken());
    	console.log(params);
		return this._http.post(this.url+'alumno_lista/',params, {headers:headers});
	}

	updateUser(user: User, id): Observable<any>{
		let params = JSON.stringify(user);
		// let body = {
		// 	name: user.name,
		// 	email: user.email,
		// 	password: user.password
		//   };
		return this._http.put(this.url+'alumno_lista/'+id, params);
	}

	getUsers():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token f73029006270ff4068271297caf872e2a6c02554');
		return this._http.get(this.url+'alumno_lista/', {headers:headers});
	}

	getUser(id):Observable<any>{
		//let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());
		return this._http.get(this.url+'user/'+this.id);
	}

	deleteUser(id): Observable<any>{
		console.log(this.id);
		//let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
		return this._http.delete(this.url+'user/'+id);
	}

	getToken(){
		let token = localStorage.getItem('token');
		console.log(token);
		if (token != "undefined") {
			this.token = token;
		}else{
			this.token = null
		}
		return this.token;
	}
}
