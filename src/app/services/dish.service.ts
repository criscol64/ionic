import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from '../shared/dish';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(public http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(error => { return this.processHTTPMsgService.handleError(error); }));
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get<Dish>(baseURL + 'dishes/'+ id)
       .pipe(catchError(error => { return this.processHTTPMsgService.handleError(error); }));
 }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dish => dish[0]))
      .pipe(catchError(error => { return this.processHTTPMsgService.handleError(error); }));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
}
