import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/dish';
import { IonItemSliding, ToastController, LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(private favoriteservice: FavoriteService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }

  async deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);
    const alert = await this.alertCtrl.create({
      header: 'Confirm Title',
      message: 'Do you want to delete favorite ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled')
          }
        },
        {
          text: 'Delete',
          handler: async() => {
            const loading = await this.loadingCtrl.create({
              message: 'Deleting . . .'
            });
            loading.present();
            const toast = await this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully',
              color: "medium",
              duration: 3000
            });
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present();},
                errmess => {this.errMess = errmess; loading.dismiss();});
          }
        }
      ]
    });
    alert.present();
    item.close();
  }

}
