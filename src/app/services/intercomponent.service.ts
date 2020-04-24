import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercomponentService {

  constructor() { }
   
private subject = new BehaviorSubject<any>('');
private labList = new BehaviorSubject<any>('');

sendMessage(message) {
    this.subject.next(message);
}
getMessage(): Observable<any> {
    return this.subject.asObservable();
}

sendLabList(list){
  this.labList.next(list);
}
getLabList():Observable<any>{
  return this.labList.asObservable();

}
}