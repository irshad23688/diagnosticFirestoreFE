import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Configuration } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private httpClient: HttpClient, private config: Configuration) { }

  getPaymentDetails(payID){
    return this.httpClient.get(this.config.gatewayrUrl+payID);
  }
}
