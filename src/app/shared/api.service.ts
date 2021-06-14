import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loginURL = "https://demo.credy.in/api/v1/usermodule/login/"
  moviesURL = "https://demo.credy.in/api/v1/maya/movies/"
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  })
  constructor(private httpClient: HttpClient) { }
  login(userName: string, passWord: string) {
    let obj = {
      "username": userName,
      "password": passWord
    }
    return this.httpClient.post(
      this.loginURL, JSON.stringify(obj), { headers: this.headers }
    ).pipe(map((response) => {
      return response;
    }));
  }
  initialMovieList(token: string | string[]) {
    var headers_object = new HttpHeaders().set("Authorization", "Token " + token);
    return this.httpClient.get(
      this.moviesURL, {
      headers: headers_object
    }
    ).pipe(map((response) => {
      return response;
    }));
  }
  movieList(token: string | string[], url) {
    var headers_object = new HttpHeaders().set("Authorization", "Token " + token);
    return this.httpClient.get(
      url, {
      headers: headers_object
    }
    ).pipe(map((response) => {
      return response;
    }));
  }


}
