import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/dish';
import { IonItemSliding  } from '@ionic/angular';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(private favoriteservice: FavoriteService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }

  deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);
    this.favoriteservice.deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
    item.close();
  }

}
