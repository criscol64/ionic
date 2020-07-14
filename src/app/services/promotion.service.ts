import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from '../shared/promotion';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(error => { return this.processHTTPMsgService.handleError(error); }));
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(error => { return this.processHTTPMsgService.handleError(error); }));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
      .pipe(map(promotion => promotion[0]))
      .pipe(catchError(error => { return this.processHTTPMsgService.handleError(error); }));
  }
}
