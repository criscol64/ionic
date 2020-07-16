import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { DishService } from '../services/dish.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(private dishservice: DishService) {
    this.favorites = [];
  }

  addFavorite(id:number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      return this.getFavorites();
    } else {
      console.log('Delete non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

}
