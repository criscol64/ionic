import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { ToastController  } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishservice: DishService,
    private favoriteservice: FavoriteService,
    private toastCtrl: ToastController,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  async addToFavorites(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this.favoriteservice.addFavorite(dish.id);
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + dish.id + ' Added Favorite successfully',
      color: "medium",
      duration: 3000});
    toast.present();
  }

}
