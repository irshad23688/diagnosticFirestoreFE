import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const headerList={
 headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:8200',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
 }),
 responseType: 'text' as'json'
}
// const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl='https://us-central1-diagnosticappbe.cloudfunctions.net/donate';
  constructor(private http: HttpClient) { }

  postMessage(jsonObj) : Observable<any>{
    return this.http.post(this.baseUrl,jsonObj,headerList)
    // return this.http.post(this.baseUrl +'?amount=250.82'+'&name=Aqueel'+'&email=aqueelshaikh@outlook.com'+'&mobile=8433912884',headerList)

  }
}
