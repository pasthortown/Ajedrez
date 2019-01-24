import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) { }

  login(email: String, password: String): Promise<any> {
    const data = {email: email, password: password};
    return this.http.post(environment.api + 'login', JSON.stringify(data)).toPromise()
    .then( r =>
      r.json()
    ).catch( error => {
      error.json();
    });
  }

  register(name: String, email: String): Promise<any> {
    const data = {name: name, email: email};
    return this.http.post(environment.api + 'register', JSON.stringify(data)).toPromise()
    .then( r =>
      r.json()
    ).catch( error => {
      error.json();
    });
  }

  password_recovery_request(email: String): Promise<any> {
    const data = {email: email};
    return this.http.post(environment.api + 'password_recovery_request', JSON.stringify(data)).toPromise()
    .then( r =>
      r.json()
    ).catch( error => {
      error.json();
    });
  }

  password_change(new_password: String): Promise<any> {
    const data = {new_password: new_password};
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('api_token', sessionStorage.getItem('api-token'));
    return this.http.post(environment.api + 'user/password_change', JSON.stringify(data), options).toPromise()
    .then( r =>
      r.json()
    ).catch( error => {
      error.json();
    });
  }
}
