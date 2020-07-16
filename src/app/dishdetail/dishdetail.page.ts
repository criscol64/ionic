import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { ToastController  } from '@ionic/angular';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(@Inject('BaseURL') private BaseURL,
    private dishservice: DishService,
    private route: ActivatedRoute,
    private favoriteservice: FavoriteService,
    private toastCtrl: ToastController) {
    }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
      .subscribe(dish => {
        this.dish = dish; this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating );
        this.avgstars = (total/this.numcomments).toFixed(2);
        this.favorite = this.favoriteservice.isFavorite(this.dish.id);
      });
  }

  async addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
      this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' Added Favorite successfully',
      position: 'middle',
      color: "medium",
      duration: 3000});
    toast.present();
  }

}
